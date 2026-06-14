### Python module layout (host‑first, lens‑only)

Here’s a single‑module version you can drop into the substrate and then refactor into packages:

```python
# scanner_engine.py

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from enum import Enum, auto
from pathlib import Path
from typing import Iterable, List, Dict, Any, Optional
import hashlib
import json
import subprocess
import time
import uuid


# ─────────────────────────────────────────────────────────────────────────────
# 1. Core identities: Host, HostProfile, PrivilegeStance
# ─────────────────────────────────────────────────────────────────────────────

class PrivilegeStance(Enum):
    UNPRIVILEGED = auto()
    SUDO = auto()
    ROOT = auto()


@dataclass(frozen=True)
class HostIdentity:
    """Declared, not inferred."""
    host_id: uuid.UUID
    hostname: str
    fqdn: str
    os: str
    arch: str


@dataclass
class HostProfile:
    """
    Operator‑declared profile: roles + scan affordances.
    This is the *contract* between operator and scanner.
    """
    roles: List[str] = field(default_factory=list)
    scan_roots: List[Path] = field(default_factory=list)
    excluded_paths: List[Path] = field(default_factory=list)
    package_manager: Optional[str] = None  # e.g. "dpkg", "rpm", "pacman"
    service_manager: Optional[str] = None  # e.g. "systemd", "sysv"
    kernel_surface_enabled: bool = True

    def is_path_allowed(self, path: Path) -> bool:
        path = path.resolve()
        for ex in self.excluded_paths:
            if path.is_relative_to(ex.resolve()):
                return False
        return True


@dataclass
class Host:
    """Root object. Everything else is a projection."""
    identity: HostIdentity
    profile: HostProfile
    privilege_stance: PrivilegeStance


# ─────────────────────────────────────────────────────────────────────────────
# 2. Canonical surfaces: filesystem, packages, services, kernel
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class FilesystemEntry:
    path: str
    size: int
    mtime: float
    mode: int
    inode: int
    sha256: Optional[str] = None


@dataclass
class PackageEntry:
    name: str
    version: str
    arch: Optional[str] = None
    source: Optional[str] = None


@dataclass
class ServiceEntry:
    name: str
    state: str
    enabled: Optional[bool] = None


@dataclass
class KernelState:
    uname: Dict[str, str]
    modules: List[str]
    sysctl: Dict[str, str]


@dataclass
class DriftMarkers:
    """
    Minimal hints for downstream drift engines.
    Scanner does NOT compute drift; it only emits markers.
    """
    scan_seq: int
    previous_scan_id: Optional[uuid.UUID] = None


@dataclass
class HostScan:
    """Single canonical output object."""
    host_id: uuid.UUID
    scan_id: uuid.UUID
    timestamp: str
    filesystem: List[FilesystemEntry]
    packages: List[PackageEntry]
    services: List[ServiceEntry]
    kernel: KernelState
    drift_markers: DriftMarkers

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def to_json(self, *, indent: int = 2) -> str:
        return json.dumps(self.to_dict(), indent=indent, sort_keys=True)


# ─────────────────────────────────────────────────────────────────────────────
# 3. Scanner engine: three‑stage pipeline
# ─────────────────────────────────────────────────────────────────────────────

class ScannerEngine:
    """
    Host‑first, read‑only scanner.
    Stages:
      A) host_binding
      B) surface_enumeration
      C) normalization_and_emission
    """

    def __init__(self):
        # You can inject loggers, metrics, etc. here.
        self._scan_seq = 0
        self._last_scan_id: Optional[uuid.UUID] = None

    # ── Stage A: Host Binding ────────────────────────────────────────────────

    def host_binding(self, host: Host) -> Host:
        """
        Validate host identity + stance.
        No discovery here; only checks against declared identity.
        """
        # Example: ensure hostname matches runtime `uname -n` if local.
        # This is intentionally conservative and can be extended.
        # If you run remote, this would be a remote assertion instead.
        try:
            runtime_hostname = subprocess.check_output(
                ["uname", "-n"], text=True
            ).strip()
        except Exception:
            runtime_hostname = None

        if runtime_hostname and runtime_hostname != host.identity.hostname:
            # In your substrate, this would be a hard failure or a
            # "stance violation" surfaced to the operator.
            raise RuntimeError(
                f"Host identity mismatch: declared={host.identity.hostname}, "
                f"runtime={runtime_hostname}"
            )

        # Privilege stance is declared, not escalated here.
        # You can assert invariants (e.g., ROOT required for kernel surface).
        if host.profile.kernel_surface_enabled and host.privilege_stance == PrivilegeStance.UNPRIVILEGED:
            raise RuntimeError("Kernel surface requires elevated privilege stance")

        return host

    # ── Stage B: Surface Enumeration ─────────────────────────────────────────

    def surface_enumeration(self, host: Host) -> Dict[str, Any]:
        """
        Deterministic enumeration of all four surfaces.
        Returns raw, unnormalized findings.
        """
        fs = self._enumerate_filesystem(host)
        pkgs = self._enumerate_packages(host)
        svcs = self._enumerate_services(host)
        kstate = self._enumerate_kernel(host) if host.profile.kernel_surface_enabled else self._empty_kernel()

        return {
            "filesystem": fs,
            "packages": pkgs,
            "services": svcs,
            "kernel": kstate,
        }

    def _enumerate_filesystem(self, host: Host) -> List[Dict[str, Any]]:
        entries: List[Dict[str, Any]] = []

        roots = sorted({p.resolve() for p in host.profile.scan_roots})
        for root in roots:
            if not root.exists():
                continue
            for path in sorted(root.rglob("*")):
                if not path.is_file():
                    continue
                if not host.profile.is_path_allowed(path):
                    continue

                try:
                    stat = path.stat()
                except OSError:
                    continue

                sha256 = self._hash_file(path)

                entries.append({
                    "path": str(path),
                    "size": stat.st_size,
                    "mtime": stat.st_mtime,
                    "mode": stat.st_mode,
                    "inode": stat.st_ino,
                    "sha256": sha256,
                })

        return entries

    def _hash_file(self, path: Path, chunk_size: int = 1024 * 1024) -> Optional[str]:
        """
        Read‑only hashing with deterministic algorithm (sha256).
        """
        h = hashlib.sha256()
        try:
            with path.open("rb") as f:
                while True:
                    chunk = f.read(chunk_size)
                    if not chunk:
                        break
                    h.update(chunk)
            return h.hexdigest()
        except OSError:
            return None

    def _enumerate_packages(self, host: Host) -> List[Dict[str, Any]]:
        pm = host.profile.package_manager
        if pm is None:
            return []

        if pm == "dpkg":
            cmd = ["dpkg-query", "-W", "-f=${Package}\t${Version}\t${Architecture}\n"]
            try:
                out = subprocess.check_output(cmd, text=True)
            except Exception:
                return []
            entries = []
            for line in out.splitlines():
                parts = line.split("\t")
                if len(parts) < 2:
                    continue
                name = parts[0]
                version = parts[1]
                arch = parts[2] if len(parts) > 2 else None
                entries.append({"name": name, "version": version, "arch": arch})
            return entries

        # Extend with rpm, pacman, etc.
        return []

    def _enumerate_services(self, host: Host) -> List[Dict[str, Any]]:
        sm = host.profile.service_manager
        if sm is None:
            return []

        if sm == "systemd":
            cmd = ["systemctl", "list-units", "--type=service", "--all", "--no-legend", "--no-pager"]
            try:
                out = subprocess.check_output(cmd, text=True)
            except Exception:
                return []
            entries = []
            for line in out.splitlines():
                parts = line.split()
                if not parts:
                    continue
                name = parts[0]
                state = parts[3] if len(parts) > 3 else "unknown"
                entries.append({"name": name, "state": state})
            return entries

        # Extend with other service managers.
        return []

    def _enumerate_kernel(self, host: Host) -> Dict[str, Any]:
        uname_fields = ["sysname", "nodename", "release", "version", "machine"]
        try:
            uname_out = subprocess.check_output(["uname", "-s", "-n", "-r", "-v", "-m"], text=True).split()
        except Exception:
            uname_out = []

        uname = {k: (uname_out[i] if i < len(uname_out) else "") for i, k in enumerate(uname_fields)}

        # Modules (Linux example)
        modules: List[str] = []
        try:
            with open("/proc/modules") as f:
                for line in f:
                    name = line.split()[0]
                    modules.append(name)
        except OSError:
            pass

        # Sysctl snapshot (minimal, configurable)
        sysctl_keys = ["kernel.hostname", "kernel.domainname", "net.ipv4.ip_forward"]
        sysctl: Dict[str, str] = {}
        for key in sysctl_keys:
            try:
                out = subprocess.check_output(["sysctl", "-n", key], text=True).strip()
                sysctl[key] = out
            except Exception:
                continue

        return {
            "uname": uname,
            "modules": modules,
            "sysctl": sysctl,
        }

    def _empty_kernel(self) -> Dict[str, Any]:
        return {"uname": {}, "modules": [], "sysctl": {}}

    # ── Stage C: Normalization + Emission ────────────────────────────────────

    def normalization_and_emission(self, host: Host, raw: Dict[str, Any]) -> HostScan:
        """
        Convert raw findings into canonical model objects and emit HostScan.
        """
        self._scan_seq += 1
        scan_id = uuid.uuid4()
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

        fs_objs = [
            FilesystemEntry(
                path=e["path"],
                size=int(e["size"]),
                mtime=float(e["mtime"]),
                mode=int(e["mode"]),
                inode=int(e["inode"]),
                sha256=e.get("sha256"),
            )
            for e in sorted(raw["filesystem"], key=lambda x: x["path"])
        ]

        pkg_objs = [
            PackageEntry(
                name=e["name"],
                version=e["version"],
                arch=e.get("arch"),
            )
            for e in sorted(raw["packages"], key=lambda x: x["name"])
        ]

        svc_objs = [
            ServiceEntry(
                name=e["name"],
                state=e["state"],
            )
            for e in sorted(raw["services"], key=lambda x: x["name"])
        ]

        k_raw = raw["kernel"]
        k_obj = KernelState(
            uname=k_raw.get("uname", {}),
            modules=sorted(k_raw.get("modules", [])),
            sysctl=dict(sorted(k_raw.get("sysctl", {}).items())),
        )

        drift = DriftMarkers(
            scan_seq=self._scan_seq,
            previous_scan_id=self._last_scan_id,
        )

        host_scan = HostScan(
            host_id=host.identity.host_id,
            scan_id=scan_id,
            timestamp=timestamp,
            filesystem=fs_objs,
            packages=pkg_objs,
            services=svc_objs,
            kernel=k_obj,
            drift_markers=drift,
        )

        self._last_scan_id = scan_id
        return host_scan

    # ── Public one‑shot API ──────────────────────────────────────────────────

    def scan_host(self, host: Host) -> HostScan:
        """
        Operator‑stance entrypoint:
          1) bind to host
          2) enumerate surfaces
          3) normalize + emit HostScan
        """
        bound = self.host_binding(host)
        raw = self.surface_enumeration(bound)
        return self.normalization_and_emission(bound, raw)
```

---

### Example: invoking from your operator membrane

```python
import uuid
from pathlib import Path
from scanner_engine import (
    HostIdentity, HostProfile, Host, PrivilegeStance, ScannerEngine
)

identity = HostIdentity(
    host_id=uuid.uuid4(),
    hostname="xi-node-01",
    fqdn="xi-node-01.lab.local",
    os="linux",
    arch="x86_64",
)

profile = HostProfile(
    roles=["web", "db"],
    scan_roots=[Path("/etc"), Path("/usr/bin")],
    excluded_paths=[Path("/usr/bin/.cache")],
    package_manager="dpkg",
    service_manager="systemd",
    kernel_surface_enabled=True,
)

host = Host(
    identity=identity,
    profile=profile,
    privilege_stance=PrivilegeStance.ROOT,
)

engine = ScannerEngine()
scan = engine.scan_host(host)

print(scan.to_json())
```

If you want, next step we can:  
**a)** split this into `surfaces/*` modules, or  
**b)** wire `ScannerEngine.scan_host` directly into your TUI center‑pane event loop.