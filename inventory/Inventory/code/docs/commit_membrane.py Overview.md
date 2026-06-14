You’re speaking my language now.  
Let’s bolt the **scanner engine** onto the membrane stack.

Below is **`scanner_engine.py`** — a **host‑first scan executor** that:

- Orchestrates **scans over hosts/targets** (pages, blocks, files, etc.)
- Uses **pluggable scanners** (e.g., `temporal_scan`, structural scans, lint scans)
- Produces **deterministic `ScanResult` objects**
- Stays **membrane‑safe** by delegating mutations to `CommitMembrane` (optional, injectable)
- Is **pure orchestration**: no substrate assumptions beyond `StateBundle`‑like accessors

Every major function starts with a **Guided Link** comment, as requested.

---

### ⭐ `scanner_engine.py`

_Host‑first scan executor for Xi/Razor vessel_

```python
#!/usr/bin/env python3
# scanner_engine.py
# Host-first scan executor for the Xi/Razor vessel
#
# Responsibilities:
# - Orchestrate scans over hosts/targets (pages, blocks, files, etc.)
# - Provide a pluggable scanner registry
# - Normalize results into deterministic ScanResult objects
# - Optionally cooperate with CommitMembrane for auto-fix flows
# - Remain substrate-agnostic (only depends on StateBundle-like interface)

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Callable, Optional, Iterable
import time
import hashlib
import json


# ------------------------------
# Exceptions (deterministic)
# ------------------------------

class ScanError(Exception):
    """Raised when a scan fails in a non-recoverable way."""
    pass


class ScannerRegistrationError(Exception):
    """Raised when scanner registration is invalid."""
    pass


# ------------------------------
# ScanResult
# ------------------------------

@dataclass
class ScanResult:
    """
    Normalized result of a single scanner applied to a single host.
    """
    scanner_id: str
    host_id: str
    severity: str
    code: str
    message: str
    details: Dict[str, Any] = field(default_factory=dict)
    timestamp: float = field(default_factory=time.time)

    def fingerprint(self) -> str:
        """
        Deterministic fingerprint for this result.
        """
        raw = json.dumps(
            {
                "scanner_id": self.scanner_id,
                "host_id": self.host_id,
                "severity": self.severity,
                "code": self.code,
                "message": self.message,
                "details": self.details,
                "timestamp": int(self.timestamp),  # coarse-grain for stability
            },
            sort_keys=True,
        )
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()


# ------------------------------
# Scanner type
# ------------------------------

# A scanner is a callable that takes (host_id, host_payload, context)
# and yields ScanResult objects (or an iterable of them).
ScannerFn = Callable[[str, Any, Dict[str, Any]], Iterable[ScanResult]]


@dataclass
class ScannerSpec:
    """
    Metadata and callable for a scanner.
    """
    id: str
    fn: ScannerFn
    description: str = ""
    tags: List[str] = field(default_factory=list)
    enabled: bool = True


# ------------------------------
# ScannerEngine
# ------------------------------

class ScannerEngine:
    """
    Host-first scan executor.

    - Maintains a registry of scanners
    - Iterates over hosts (pages/blocks/etc.) from a StateBundle-like source
    - Executes scanners and aggregates ScanResult objects
    - Optionally cooperates with CommitMembrane for auto-fix flows
    """

    def __init__(
        self,
        state_bundle: Any,
        commit_membrane: Optional[Any] = None,
    ) -> None:
        self.state = state_bundle
        self.commit_membrane = commit_membrane
        self._scanners: Dict[str, ScannerSpec] = {}

    # ---------------------------------------------------------
    # [register_scanner] — add scanner to registry
    # ---------------------------------------------------------
    def register_scanner(self, spec: ScannerSpec) -> None:
        """Register a scanner with the engine."""
        if not spec.id:
            raise ScannerRegistrationError("ScannerSpec.id must be non-empty")

        if spec.id in self._scanners:
            raise ScannerRegistrationError(f"Scanner already registered: {spec.id}")

        if not callable(spec.fn):
            raise ScannerRegistrationError(f"Scanner fn must be callable: {spec.id}")

        self._scanners[spec.id] = spec

    # ---------------------------------------------------------
    # [list_scanners] — enumerate scanners
    # ---------------------------------------------------------
    def list_scanners(self, include_disabled: bool = False) -> List[ScannerSpec]:
        """Return a list of registered scanners."""
        specs = list(self._scanners.values())
        if include_disabled:
            return specs
        return [s for s in specs if s.enabled]

    # ---------------------------------------------------------
    # [get_scanner] — fetch scanner by id
    # ---------------------------------------------------------
    def get_scanner(self, scanner_id: str) -> ScannerSpec:
        """Return a scanner spec by id, or raise."""
        try:
            return self._scanners[scanner_id]
        except KeyError:
            raise ScanError(f"Unknown scanner: {scanner_id}")

    # ---------------------------------------------------------
    # [iter_hosts] — host enumeration
    # ---------------------------------------------------------
    def iter_hosts(
        self,
        host_kind: str = "page",
        limit: Optional[int] = None,
    ) -> Iterable[str]:
        """
        Enumerate host identifiers from the state.

        host_kind:
            - "page": iterate over page IDs
            - "block": iterate over block IDs
            - other kinds can be added by extending StateBundle.
        """
        if host_kind == "page":
            ids = getattr(self.state, "list_pages", lambda: [])()
        elif host_kind == "block":
            ids = getattr(self.state, "list_blocks", lambda: [])()
        else:
            raise ScanError(f"Unsupported host_kind: {host_kind}")

        count = 0
        for host_id in ids:
            yield host_id
            count += 1
            if limit is not None and count >= limit:
                break

    # ---------------------------------------------------------
    # [load_host_payload] — fetch host content
    # ---------------------------------------------------------
    def load_host_payload(self, host_kind: str, host_id: str) -> Any:
        """Load the payload/content for a given host."""
        if host_kind == "page":
            getter = getattr(self.state, "get_page", None)
        elif host_kind == "block":
            getter = getattr(self.state, "get_block", None)
        else:
            raise ScanError(f"Unsupported host_kind: {host_kind}")

        if getter is None:
            raise ScanError(f"StateBundle missing getter for host_kind={host_kind}")

        return getter(host_id)

    # ---------------------------------------------------------
    # [run_scanner_on_host] — core execution
    # ---------------------------------------------------------
    def run_scanner_on_host(
        self,
        scanner: ScannerSpec,
        host_kind: str,
        host_id: str,
        context: Optional[Dict[str, Any]] = None,
    ) -> List[ScanResult]:
        """Run a single scanner on a single host."""
        if not scanner.enabled:
            return []

        ctx = dict(context or {})
        ctx.setdefault("host_kind", host_kind)

        payload = self.load_host_payload(host_kind, host_id)

        try:
            results_iter = scanner.fn(host_id, payload, ctx)
        except Exception as e:
            raise ScanError(f"Scanner {scanner.id} failed on host {host_id}: {e}")

        results: List[ScanResult] = []
        for r in results_iter:
            # Ensure type safety
            if not isinstance(r, ScanResult):
                raise ScanError(
                    f"Scanner {scanner.id} returned non-ScanResult for host {host_id}"
                )
            results.append(r)

        return results

    # ---------------------------------------------------------
    # [run_scans] — multi-scanner, multi-host execution
    # ---------------------------------------------------------
    def run_scans(
        self,
        host_kind: str = "page",
        scanner_ids: Optional[List[str]] = None,
        limit_hosts: Optional[int] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> List[ScanResult]:
        """
        Run one or more scanners over a set of hosts.

        - host_kind: "page" or "block"
        - scanner_ids: if None, use all enabled scanners
        - limit_hosts: optional cap on number of hosts
        """
        if scanner_ids is None:
            scanners = self.list_scanners()
        else:
            scanners = [self.get_scanner(sid) for sid in scanner_ids]

        all_results: List[ScanResult] = []
        for host_id in self.iter_hosts(host_kind=host_kind, limit=limit_hosts):
            for spec in scanners:
                results = self.run_scanner_on_host(
                    scanner=spec,
                    host_kind=host_kind,
                    host_id=host_id,
                    context=context,
                )
                all_results.extend(results)

        return all_results

    # ---------------------------------------------------------
    # [auto_fix] — optional membrane-mediated fix application
    # ---------------------------------------------------------
    def auto_fix(
        self,
        result: ScanResult,
        fix_fn: Callable[[ScanResult], Optional[Any]],
    ) -> Optional[Dict[str, Any]]:
        """
        Apply an auto-fix for a given ScanResult via CommitMembrane.

        - fix_fn: takes ScanResult → CommitEnvelope or None
        - Returns prepared commit metadata if applied, else None.
        """
        if self.commit_membrane is None:
            return None

        envelope = fix_fn(result)
        if envelope is None:
            return None

        prepared = self.commit_membrane.prepare(envelope)
        self.commit_membrane.commit(prepared)
        return prepared


# ------------------------------
# Factory
# ------------------------------

def make_scanner_engine(
    state_bundle: Any,
    commit_membrane: Optional[Any] = None,
) -> ScannerEngine:
    """Factory for ScannerEngine."""
    return ScannerEngine(state_bundle=state_bundle, commit_membrane=commit_membrane)
```

---

If you’d like, next step is:

- I can generate a **`temporal_scan.py`** module that plugs directly into this engine as a `ScannerFn`, with time‑indexed analysis over pages/blocks and clean `ScanResult` emission.