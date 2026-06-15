"""
Layout — defines pane arrangement and rendering pipeline.
"""

class Layout:
    def __init__(self):
        self.panes = {}

    def register(self, name: str, pane):
        self.panes[name] = pane

    def render(self):
        for name, pane in self.panes.items():
            pane.render()
