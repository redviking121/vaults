"""
Keymap — maps keystrokes to actions.

Invariants:
- No hardcoded terminal dependencies.
- Key bindings must be declarative.
"""

class Keymap:
    def __init__(self):
        self.bindings = {}

    def bind(self, key: str, action):
        self.bindings[key] = action

    def dispatch(self, key: str):
        if key in self.bindings:
            return self.bindings[key]()
