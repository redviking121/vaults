"""
Model — canonical data structures for the unified systems inventory.

Invariants:
- All entities must be serializable.
- All entities must have stable identifiers.
- No circular references in the prototype layer.
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class InventoryItem:
    """A single software system component."""
    id: str
    name: str
    version: Optional[str] = None
    metadata: Dict[str, str] = field(default_factory=dict)


@dataclass
class InventorySnapshot:
    """A full snapshot of the system at a point in time."""
    timestamp: str
    items: List[InventoryItem] = field(default_factory=list)
