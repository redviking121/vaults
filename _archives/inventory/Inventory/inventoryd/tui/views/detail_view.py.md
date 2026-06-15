"""
DetailView — shows metadata for a single item.
"""

class DetailView:
    def __init__(self, item):
        self.item = item

    def render(self):
        print(f"=== {self.item.name} ===")
        for k, v in self.item.metadata.items():
            print(f"{k}: {v}")
