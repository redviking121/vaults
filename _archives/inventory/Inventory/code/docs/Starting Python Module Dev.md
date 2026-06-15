You’re right—let’s get the whole spine down before the next context meteor hits.

Here’s **`chronoindex.py`** as a clean, self‑contained module.

```python
#!/usr/bin/env python3
# chronoindex.py
# Chronological index (chronoindex) for the Xi/Razor vessel
#
# Responsibilities:
# - Maintain a simple chronological ledger of events/commits
# - Provide stable chronological IDs
# - Expose temporal state for scans
# - Offer a high-level apply() hook for the root event loop

import os
import json
import time
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


# ------------------------------------------------------------
# Configuration Envelope
# ------------------------------------------------------------

@dataclass
class ChronoConfig:
    root_path: str          # e.g., "/home/red/Documents/library"
    index_file: str = "chronoindex.json"


# ------------------------------------------------------------
# Utility: Safe file read/write
# ------------------------------------------------------------

def _safe_read_json(path: str) -> Optional[Any]:
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def _safe_write_json(path: str, data: Any) -> bool:
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        return True
    except Exception:
        return False


# ------------------------------------------------------------
# Core: Load / Initialize Index
# ------------------------------------------------------------

def _index_path(config: ChronoConfig) -> str:
    return os.path.join(config.root_path, config.index_file)


def load_index(config: ChronoConfig) -> List[Dict[str, Any]]:
    """
    Loads the chronoindex from disk.
    Returns an empty list if it does not exist or is invalid.
    """
    path = _index_path(config)
    data = _safe_read_json(path)
    if isinstance(data, list):
        return data
    return []


def save_index(config: ChronoConfig, index: List[Dict[str, Any]]) -> bool:
    """
    Persists the chronoindex to disk.
    """
    path = _index_path(config)
    return _safe_write_json(path, index)


# ------------------------------------------------------------
# ID + Entry Construction
# ------------------------------------------------------------

def _now_ts() -> float:
    return time.time()


def _now_iso() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def next_id(index: List[Dict[str, Any]]) -> int:
    """
    Returns the next chronological ID (monotonic integer).
    """
    if not index:
        return 1
    last = index[-1]
    try:
        return int(last.get("id", 0)) + 1
    except Exception:
        return len(index) + 1


def make_entry(kind: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Constructs a chronoindex entry (without ID).
    """
    return {
        "kind": kind,
        "payload": payload,
        "ts": _now_ts(),
        "iso": _now_iso(),
    }


def append_entry(config: ChronoConfig, kind: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Appends a new entry to the chronoindex and persists it.
    Returns the full entry (including assigned ID).
    """
    index = load_index(config)
    entry = make_entry(kind, payload)
    entry_id = next_id(index)
    entry["id"] = entry_id
    index.append(entry)
    save_index(config, index)
    return entry


# ------------------------------------------------------------
# Temporal State for Scans
# ------------------------------------------------------------

def get_temporal_state(config: ChronoConfig) -> Dict[str, Any]:
    """
    Returns temporal state for the Temporal Scan:
    - now (iso + ts)
    - last_commit (if any)
    - length of chronoindex
    """
    index = load_index(config)
    now_ts = _now_ts()
    now_iso = _now_iso()

    last_commit = None
    for entry in reversed(index):
        if entry.get("kind") == "commit":
            last_commit = {
                "id": entry.get("id"),
                "iso": entry.get("iso"),
                "ts": entry.get("ts"),
            }
            break

    return {
        "now": {
            "ts": now_ts,
            "iso": now_iso,
        },
        "last_commit": last_commit,
        "length": len(index),
    }


# ------------------------------------------------------------
# High-Level Apply Hook
# ------------------------------------------------------------

def chrono_apply(state: Dict[str, Any], config: ChronoConfig) -> Dict[str, Any]:
    """
    High-level chronoindex entrypoint:
    - If state['commit']['payload'] exists, append a 'commit' entry
    - Optionally append other events from state['events']
    - Update state['clock'] with temporal info
    """

    # Commit event
    commit_payload = state.get("commit", {}).get("payload")
    if commit_payload:
        append_entry(config, "commit", commit_payload)

    # Generic events (optional)
    events = state.get("events", [])
    if isinstance(events, list):
        for ev in events:
            if not isinstance(ev, dict):
                continue
            kind = ev.get("kind", "event")
            payload = ev.get("payload", {})
            if isinstance(payload, dict):
                append_entry(config, kind, payload)

    # Update temporal state
    state["clock"] = get_temporal_state(config)
    return state
```

If you want to keep rolling while the stack is “hot in RAM”, the next two that lock this together are:

- `scanner_engine.py` — takes `SCAN_REGISTRY`, runs scans, emits events
- `tui_event_loop.py` — the host loop that calls scanner + integrations

Tell me which one you want next and we’ll keep laying track before the storm comes back.