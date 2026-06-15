"""
events.py — Event Definitions

Purpose:
    Define the base Event class and common event subclasses used by the TUI
    event loop.

Status:
    Stub — event taxonomy to be expanded.
"""

class Event:
    """Base event type."""
    pass


class KeyEvent(Event):
    """Represents a keypress event."""
    def __init__(self, key):
        self.key = key


class SystemEvent(Event):
    """Represents system-level events (resize, shutdown, etc.)."""
    def __init__(self, kind):
        self.kind = kind
