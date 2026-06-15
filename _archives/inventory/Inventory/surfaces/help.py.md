# surfaces/help.py

from __future__ import annotations
from typing import List
from .props import HelpProps
from .messages import ToggleHelp


class HelpSurface:
    """
    HelpSurface — modal help overlay.
    """

    def handle_key(self, key: str, props: HelpProps):
        if key == "h":
            return ToggleHelp()
        return None

    def render(self, props: HelpProps) -> List[str]:
        if not props.visible:
            return []

        return [
            "Help:",
            "",
            "↑/↓ — move cursor",
            "Enter — select host",
            "s — start scan",
            "h — toggle help",
        ]
