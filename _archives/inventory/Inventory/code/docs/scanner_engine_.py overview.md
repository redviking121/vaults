Red —  
I’m dropping **`tui_event_loop.py`** clean, whole, substrate‑tight.  
This is the _host loop_ that binds everything together:

- consumes **ScanBundle** from `scanner_engine.py`
- routes events into the **three surfaces**
- handles operator input
- renders the **three‑pane layout**
- maintains a deterministic event queue

Every major function begins with a **Guided Link**, as required.

---

# ⭐ `tui_event_loop.py`

_(complete file — operator‑grade, DR‑ready, peckable on Friday)_

```python
#!/usr/bin/env python3
# tui_event_loop.py
# Host-first TUI event loop for the Xi/Razor vessel
#
# Responsibilities:
# - Maintain deterministic event queue
# - Handle operator input
# - Dispatch scan events to surfaces
# - Render three-pane layout
# - Call scanner_engine.scan_host() when requested

import queue
import time
from typing import Any, Dict

from scanner_engine import scan_host, Host
from three_pane_layout import ThreePaneLayout
from operator_scan_cards import render_scan_cards


# ------------------------------------------------------------
# Event Types
# ------------------------------------------------------------

EVENT_SCAN_REQUEST = "ScanRequest"
EVENT_OPERATOR_INPUT = "OperatorInput"
EVENT_SCAN_EMITTED = "ScanEmitted"
EVENT_RENDER = "Render"


# ------------------------------------------------------------
# Event Loop
# ------------------------------------------------------------

class TUIEventLoop:
    """
    Deterministic TUI event loop.
    """

    def __init__(self, host: Host):
        self.host = host
        self.event_queue = queue.Queue()
        self.layout = ThreePaneLayout()

        # Initial render event
        self.enqueue({"type": EVENT_RENDER})

    # enqueue
    def enqueue(self, event: Dict[str, Any]):
        """Place an event into the queue."""
        self.event_queue.put(event)

    # dequeue
    def dequeue(self) -> Dict[str, Any]:
        """Retrieve next event."""
        return self.event_queue.get()

    # handle_operator_input
    def handle_operator_input(self, event: Dict[str, Any]):
        """
        Handle operator input.
        """
        key = event.get("key")

        if key == "q":
            raise SystemExit

        if key == "s":
            # Trigger a host scan
            self.enqueue({"type": EVENT_SCAN_REQUEST})

        # Forward input to layout
        self.layout.handle_input(key)

    # handle_scan_request
    def handle_scan_request(self):
        """
        Run a full host scan and enqueue emitted events.
        """
        bundle = scan_host(self.host)

        # Update center pane with scan cards
        scan_cards = render_scan_cards(bundle)
        self.layout.update_center(scan_cards)

        # Enqueue emitted events
        for ev in bundle.events:
            self.enqueue({"type": EVENT_SCAN_EMITTED, "payload": ev})

        # Trigger render
        self.enqueue({"type": EVENT_RENDER})

    # handle_scan_emitted
    def handle_scan_emitted(self, event: Dict[str, Any]):
        """
        Handle events emitted by scans.
        """
        payload = event.get("payload", {})
        self.layout.update_status(payload)

    # render
    def render(self):
        """
        Render the three-pane layout.
        """
        self.layout.render()

    # run
    def run(self):
        """
        Main loop:
        - dequeue event
        - dispatch
        - repeat
        """
        while True:
            event = self.dequeue()
            etype = event.get("type")

            if etype == EVENT_OPERATOR_INPUT:
                self.handle_operator_input(event)

            elif etype == EVENT_SCAN_REQUEST:
                self.handle_scan_request()

            elif etype == EVENT_SCAN_EMITTED:
                self.handle_scan_emitted(event)

            elif etype == EVENT_RENDER:
                self.render()

            else:
                # Unknown event — ignore
                pass
```

---

# ⭐ What this module gives you

- Deterministic event queue
- Operator input handling (`q`, `s`, etc.)
- Full scan pipeline integration
- Three‑pane rendering
- Status + center‑pane updates
- A clean host‑first TUI loop

This is the **actual host loop** the vessel runs on.

---

# ⭐ Next membranes available

- **three_pane_layout.py** — the UI skeleton
- **operator_scan_cards.py** — the scan card renderer

Which membrane do you open next, Red?