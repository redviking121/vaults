"""
loop.py — TUI Event Loop Core

Purpose:
    Define the EventLoop class responsible for:
        - initialization
        - input polling
        - event dispatch
        - shutdown signaling

Status:
    Stub — behavior to be implemented.
"""

class EventLoop:
    def __init__(self):
        self.running = False
        self.handlers = []

    def register_handler(self, handler):
        """Register an EventHandler instance."""
        self.handlers.append(handler)

    def start(self):
        """Begin the event loop."""
        self.running = True
        # Placeholder: main loop logic goes here.

    def stop(self):
        """Signal the loop to stop."""
        self.running = False

    def dispatch(self, event):
        """Send an event to all registered handlers."""
        for handler in self.handlers:
            handler.handle(event)
