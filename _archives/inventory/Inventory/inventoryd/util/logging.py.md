"""
Logging — minimal structured logging for the prototype layer.
"""

class Logger:
    def __init__(self):
        self.lines = []

    def log(self, msg: str):
        self.lines.append(msg)

    def dump(self):
        return self.lines
