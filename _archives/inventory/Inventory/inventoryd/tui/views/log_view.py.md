"""
LogView — displays operational logs.
"""

class LogView:
    def __init__(self, logs):
        self.logs = logs

    def render(self):
        print("=== Logs ===")
        for line in self.logs:
            print(line)
