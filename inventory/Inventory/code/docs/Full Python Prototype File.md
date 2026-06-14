Red —  
good. That’s the _correct_ instinct for an operator.

A GUI is a **posture shift**.  
A TUI is a **continuation of stance**.

You stay in the terminal.  
You stay in flow.  
You stay remote‑friendly, SSH‑friendly, tmux‑friendly, ops‑friendly.  
You stay in the operator geometry.

So if we’re committing to the TUI as the _primary_ interface, then the next move is to **treat the TUI as the real front‑end** and the CLI as a thin compatibility layer.

Below is the **operator‑grade TUI wiring plan**, clean, fast, and aligned with your substrate.

---

# ⭐ The TUI Becomes the Primary Interface

_(fast to implement, fast to run, zero GUI contamination)_

The TUI should do three things:

1. **Render the current snapshot**
2. **Let the operator trigger a scan**
3. **Let the operator diff snapshots**

Everything else is optional.

To get there, we wire the TUI into the core like this:

```
core → tui.app → tui.layout → tui.views
```

And the CLI becomes:

```
cli.commands → tui.app
```

Meaning:  
**the CLI launches the TUI**, not the other way around.

---

# 🧩 Step 1 — Add a TUI launcher that _owns_ the operator loop

### `inventoryd/tui/app.py`

```python
"""
TUI app — binds layout, keymap, and core operations.

Operator invariant:
    The TUI is the primary operator interface.
"""

from typing import Sequence
from ..core import Scanner, Storage, Reconciler
from ..util import Logger, ensure_dir
from .layout import Layout
from .keymap import Keymap
from .views.inventory_view import InventoryView
from .views.log_view import LogView


class InventoryApp:
    def __init__(self, root):
        self.root = ensure_dir(root)
        self.logger = Logger()
        self.layout = Layout()
        self.keymap = Keymap()

        # initial state
        self.snapshot = None
        self.logs = []

        # bind keys
        self.keymap.bind("s", self.scan)
        self.keymap.bind("d", self.diff)
        self.keymap.bind("q", self.quit)

    def scan(self):
        self.logger.log("scan triggered")
        snap = Scanner().scan()
        Storage(self.root).save_snapshot(snap)
        self.snapshot = snap
        self.logs = self.logger.dump()

    def diff(self):
        self.logger.log("diff triggered (prototype)")
        # prototype: no args, no selection
        self.logs = self.logger.dump()

    def quit(self):
        raise SystemExit

    def run(self):
        # prototype: single render pass
        self.layout.register("inventory", InventoryView(self.snapshot))
        self.layout.register("logs", LogView(self.logs))
        self.layout.render()
```

This is intentionally **minimal**.  
It gives you:

- a TUI app object
- key bindings
- scan + diff hooks
- a render pipeline

And it stays **pure terminal**.

---

# 🧩 Step 2 — Make the CLI launch the TUI

### `inventoryd/cli/commands.py`

```python
from pathlib import Path
from ..tui.app import InventoryApp

def cmd_tui(root: str):
    app = InventoryApp(Path(root))
    app.run()
```

---

# 🧩 Step 3 — Add a CLI entrypoint for the TUI

### `inventoryd/__main__.py`

```python
from .cli.commands import cmd_tui

# ...
tui_p = sub.add_parser("tui", help="launch TUI")
tui_p.add_argument("--root", required=True)

# ...
elif args.command == "tui":
    cmd_tui(args.root)
```

Now you can run:

```
python -m inventoryd tui --root ./snapshots
```

And you stay in the terminal.  
No GUI.  
No chrome.  
No posture shift.

---

# ⭐ What this gives you immediately

- A **terminal‑native operator interface**
- Remote‑friendly (SSH, mosh, tmux)
- Fast to implement
- Fast to extend
- Zero GUI contamination
- Clean separation of concerns
- A substrate‑aligned operator stance

This is exactly the geometry you want for a **unified systems inventory**.

---

# ⭐ Next moves (pick one)

- **Map operator workflows for TUI**
- **Specify TUI keymap and panes**
- **Write first Python prototype functions**

Tell me which surface you want to activate, Red.