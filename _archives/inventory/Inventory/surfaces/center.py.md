# surfaces/center.py

from __future__ import annotations
from typing import List, Optional
from .props import CenterProps
from .messages import StartScan


class CenterSurface:
    """
    CenterSurface — the operator membrane.
    Pure state machine: intent in → render out.
    """

    def __init__(self):
        self.cursor = 0

    # ─────────────────────────────────────────────────────────────
    # Intent emission
    # ─────────────────────────────────────────────────────────────
    def handle_key(self, key: str, props: CenterProps):
        if key == "s" and props.host:
            return StartScan(props.host)
        return None

    # ─────────────────────────────────────────────────────────────
    # Render
    # ─────────────────────────────────────────────────────────────
    def render(self, props: CenterProps) -> List[str]:
        mode = props.mode

        if mode == "idle":
            return self._render_idle(props)

        if mode == "scanning":
            return self._render_scanning(props)

        if mode == "complete":
            return self._render_complete(props)

        return ["<unknown mode>"]

    # ─────────────────────────────────────────────────────────────
    # States
    # ─────────────────────────────────────────────────────────────
    def _render_idle(self, props: CenterProps) -> List[str]:
        if not props.host:
            return ["No host selected.", "Select a host from the left pane."]
        return [
            f"Host: {props.host}",
            "",
            "Press 's' to start scan.",
        ]

    def _render_scanning(self, props: CenterProps) -> List[str]:
        p = props.progress or 0
        bar = "#" * (p // 10)
        return [
            f"Scanning {props.host}…",
            f"[{bar:<10}] {p}%",
        ]

    def _render_complete(self, props: CenterProps) -> List[str]:
        result = props.scan_result or {}
        lines = [f"Scan complete for {props.host}", ""]
        for k, v in result.items():
            lines.append(f"{k}: {v}")
        return lines
