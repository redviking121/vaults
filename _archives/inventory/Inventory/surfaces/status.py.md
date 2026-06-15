# surfaces/status.py

from __future__ import annotations
from typing import List
from .props import StatusProps


class StatusSurface:
    """
    StatusSurface — bottom bar for operator feedback.
    """

    def render(self, props: StatusProps) -> List[str]:
        prefix = {
            "info": "[INFO] ",
            "warn": "[WARN] ",
            "error": "[ERROR]",
        }.get(props.level, "[INFO] ")

        return [prefix + props.message]
