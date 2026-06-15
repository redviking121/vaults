"""
Scanner — discovers software systems on the host.

Invariants:
- Scanning must not mutate the environment.
- Output must be stable for identical environments.
"""

from .model import InventoryItem, InventorySnapshot
from datetime import datetime


class Scanner:
    def scan(self) -> InventorySnapshot:
        # Prototype: return a synthetic snapshot
        now = datetime.utcnow().isoformat()
        items = [
            InventoryItem(id="python", name="Python", version="3.x"),
            InventoryItem(id="os", name="Operating System"),
        ]
        return InventorySnapshot(timestamp=now, items=items)
