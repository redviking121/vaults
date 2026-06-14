# surfaces/inventory.py

from __future__ import annotations
from typing import List, Optional
from .props import InventoryProps
from .messages import SelectHost


class InventorySurface:
    """
    InventorySurface — the left pane.
    Emits SelectHost when operator chooses a host.
    """

    def __init__(self):
        self.cursor = 0

    # ─────────────────────────────────────────────────────────────
    # Intent emission
    # ─────────────────────────────────────────────────────────────
    def handle_key(self, key: str, props: InventoryProps):
        if key == "up":
            self.cursor = max(0, self.cursor - 1)
        elif key == "down":
            self.cursor = min(len(props.hosts) - 1, self.cursor + 1)
        elif key == "enter" and props.hosts:
            return SelectHost(props.hosts[self.cursor])

        return None

    # ─────────────────────────────────────────────────────────────
    # Render
    # ─────────────────────────────────────────────────────────────
    def render(self, props: InventoryProps) -> List[str]:
        lines = ["Hosts:"]
        for idx, host in enumerate(props.hosts):
            prefix = "→ " if idx == self.cursor else "  "
            lines.append(f"{prefix}{host}")
        return lines
