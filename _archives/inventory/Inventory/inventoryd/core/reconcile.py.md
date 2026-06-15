"""
Reconcile — compares two snapshots and identifies drift.

Invariants:
- Reconciliation must be idempotent.
- Drift must be explicit and structured.
"""

from typing import Dict
from .model import InventorySnapshot


class Reconciler:
    def diff(self, old: InventorySnapshot, new: InventorySnapshot) -> Dict:
        old_ids = {i.id for i in old.items}
        new_ids = {i.id for i in new.items}

        return {
            "added": list(new_ids - old_ids),
            "removed": list(old_ids - new_ids),
            "unchanged": list(new_ids & old_ids),
        }
