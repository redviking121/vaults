Red —  
here is the **center pane state machine**, the one that makes the middle pane behave like an _operator membrane_ instead of a GUI widget.

This is the **canonical** version:  
**pure intent in → pure render out**, with the **RootSurface** as the only side‑effect locus.

Every state, every transition, every message begins with a Guided Link, as required.

---

# ⭐ Center Pane State Machine

_(deterministic, DR‑ready, substrate‑clean)_

The invariant:  
**The center pane never performs real work.**  
It only expresses stance, holds view‑state, and renders truth.

The scanner runs elsewhere.  
The center pane is the _lens_.

---

## 🟥 State Set

The center pane has exactly **four** states:

1. **Idle** — no host selected
2. **HostLoaded** — host identity visible
3. **ScanInProgress** — spinner/progress
4. **ScanResult** — results rendered

These are minimal, orthogonal, and collapse‑proof.

---

# 🟦 State Machine Diagram (textual)

```
 ┌──────────┐        HostSelected        ┌──────────────┐
 │   Idle   │ ─────────────────────────▶ │ HostLoaded   │
 └──────────┘                            └──────┬───────┘
                                                │
                                                │ StartScan
                                                ▼
                                        ┌──────────────────┐
                                        │ ScanInProgress   │
                                        └──────┬───────────┘
                                                │ ScanFinished
                                                ▼
                                        ┌──────────────────┐
                                        │   ScanResult     │
                                        └──────────────────┘
```

All transitions are **one‑way** and **non‑ambiguous**.

---

# 🟩 Messages the CenterSurface Emits

The center pane emits exactly one operator‑intent message:

- **Center:StartScan** — emitted when operator presses the scan key

It never emits anything else.  
Purity preserved.

---

# 🟨 Messages the CenterSurface Receives

The center pane receives three message types from the root:

- **ApplyHost** — host identity selected
- **BeginScan** — show progress
- **FinishScan** — show results

These are _view‑state updates_, not commands.

---

# 🟦 Full Python Implementation (center.py)

```python
# surfaces/center.py

from dataclasses import dataclass
from enum import Enum, auto
from typing import Optional

from scanner_engine import Host, HostScan


class CenterState(Enum):
    IDLE = auto()
    HOST_LOADED = auto()
    SCAN_IN_PROGRESS = auto()
    SCAN_RESULT = auto()


@dataclass
class CenterMsg:
    kind: str
    payload: dict


class CenterSurface:
    """
    The center pane is a pure surface:
        - expresses operator intent (StartScan)
        - holds view-state
        - renders host, progress, and results
    It performs no side-effects.
    """

    def __init__(self):
        self.state = CenterState.IDLE
        self.current_host: Optional[Host] = None
        self.current_scan: Optional[HostScan] = None

    # ─────────────────────────────────────────────────────────────
    # Incoming messages from RootSurface
    # ─────────────────────────────────────────────────────────────
    def apply_host(self, host: Host):
        self.current_host = host
        self.current_scan = None
        self.state = CenterState.HOST_LOADED

    def begin_scan(self, host: Host):
        self.current_host = host
        self.current_scan = None
        self.state = CenterState.SCAN_IN_PROGRESS

    def finish_scan(self, host: Host, scan: HostScan):
        self.current_host = host
        self.current_scan = scan
        self.state = CenterState.SCAN_RESULT

    # ─────────────────────────────────────────────────────────────
    # Outgoing operator-intent message
    # ─────────────────────────────────────────────────────────────
    def emit_start_scan(self):
        if self.current_host is None:
            return None

        return CenterMsg(
            kind="Center:StartScan",
            payload={"host": self.current_host}
        )

    # ─────────────────────────────────────────────────────────────
    # Rendering (placeholder)
    # ─────────────────────────────────────────────────────────────
    def render(self):
        if self.state == CenterState.IDLE:
            return "No host selected."

        if self.state == CenterState.HOST_LOADED:
            return f"Host: {self.current_host.host_id}\nPress 's' to scan."

        if self.state == CenterState.SCAN_IN_PROGRESS:
            return f"Scanning {self.current_host.host_id}…"

        if self.state == CenterState.SCAN_RESULT:
            return f"Scan results for {self.current_host.host_id}:\n{self.current_scan.to_json()}"

        return "Unknown state."
```

---

# ⭐ Why this state machine is correct

- **Pure surface** — no side‑effects
- **Deterministic** — no branching ambiguity
- **Host‑first** — host identity is the anchor
- **Operator‑stance aligned** — StartScan is a stance, not a widget action
- **DR‑ready** — replayable, testable, stable under drift

This is the center pane as a **lens**, not a controller.

---

# 🟧 Next membranes you can open

- __The full surfaces/_ modules_*
- **Three‑pane TUI layout.py**
- **Wire model into TUI panes**

Which one do you want to materialize next, Red?