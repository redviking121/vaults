from pathlib import Path
import json

from .model import InventorySnapshot, InventoryItem
from ..util import ensure_dir


class Storage:
    def __init__(self, root: Path):
        self.root = ensure_dir(root)
    ...
