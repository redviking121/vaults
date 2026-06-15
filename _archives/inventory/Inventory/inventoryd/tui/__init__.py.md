"""
TUI subsystem — terminal UI for interacting with the inventory.

Invariants:
- TUI must remain non-blocking.
- All views must be pure render functions.
"""

from .layout import Layout
from .keymap import Keymap
from .views.inventory_view import InventoryView
from .views.detail_view import DetailView
from .views.log_view import LogView

__all__ = ["Layout", "Keymap", "InventoryView", "DetailView", "LogView"]

