"""
InventoryView — displays the full inventory snapshot.
"""

class InventoryView:
    def __init__(self, snapshot):
        self.snapshot = snapshot

    def render(self):
        print("=== Inventory ===")
        for item in self.snapshot.items:
            print(f"- {item.id}: {item.name} ({item.version})")
