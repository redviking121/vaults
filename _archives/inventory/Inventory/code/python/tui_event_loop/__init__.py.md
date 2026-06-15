"""
tui_event_loop
Xi/Razor Vessel — TUI Event Loop Subsystem

Purpose:
    Provide a minimal, deterministic event loop for terminal‑based operator
    interaction. Handles input, dispatch, and lifecycle control.

Status:
    Stub — semantics deferred.
"""

from .loop import EventLoop
from .events import Event, KeyEvent, SystemEvent
from .handlers import EventHandler
