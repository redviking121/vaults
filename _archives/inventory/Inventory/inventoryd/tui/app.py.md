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
