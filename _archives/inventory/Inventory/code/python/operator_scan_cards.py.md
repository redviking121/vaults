
#!/usr/bin/env python3
# operator_scan_cards.py
# Center-pane card renderer for the Xi/Razor vessel
#
# Responsibilities:
# - Render operator-grade scan cards in the center pane
# - Provide deterministic formatting for scan metadata
# - Expose a clean API for the TUI event loop
# - Keep rendering pure: no IO, no side effects

from dataclasses import dataclass
from typing import Dict, Any, List, Optional


# ------------------------------------------------------------
# Card Model
# ------------------------------------------------------------

@dataclass
class ScanCard:
    scan_id: str
    title: str
    purpose: str
    trigger: str
    inputs: List[str]
    outputs: List[str]
    under_fire: str
    compression: str
    failure_modes: List[str]
    verification: str
    registry_slot: str


# ------------------------------------------------------------
# [load_cards](ca://s?q=Load_operator_scan_cards)
# ------------------------------------------------------------

def load_cards(registry: Dict[str, Dict[str, Any]]) -> Dict[str, ScanCard]:
    """
    Convert SCAN_REGISTRY metadata into ScanCard objects.
    """
    cards = {}
    for scan_id, meta in registry.items():
        cards[scan_id] = ScanCard(
            scan_id=scan_id,
            title=meta.get("title", scan_id),
            purpose=meta.get("purpose", ""),
            trigger=meta.get("trigger", ""),
            inputs=meta.get("inputs", []),
            outputs=meta.get("outputs", []),
            under_fire=meta.get("under_fire", ""),
            compression=meta.get("compression", ""),
            failure_modes=meta.get("failure_modes", []),
            verification=meta.get("verification", ""),
            registry_slot=meta.get("registry_slot", ""),
        )
    return cards


# ------------------------------------------------------------
# [render_card](ca://s?q=Render_operator_scan_card)
# ------------------------------------------------------------

def render_card(card: ScanCard, width: int = 60) -> List[str]:
    """
    Render a single ScanCard into a list of text lines suitable
    for the center pane.
    """
    lines = []
    border = "─" * width

    lines.append(border)
    lines.append(f"SCAN: {card.scan_id} — {card.title}")
    lines.append(border)

    def block(label: str, content: Any):
        lines.append(f"{label}:")
        if isinstance(content, list):
            for item in content:
                lines.append(f"  - {item}")
        else:
            for line in content.split("\n"):
                lines.append(f"  {line}")
        lines.append("")

    block("Purpose", card.purpose)
    block("Trigger", card.trigger)
    block("Inputs", card.inputs)
    block("Outputs", card.outputs)
    block("Under Fire Protocol", card.under_fire)
    block("Five-Word Compression", card.compression)
    block("Failure Modes", card.failure_modes)
    block("Verification Signal", card.verification)
    block("Registry Slot", card.registry_slot)

    lines.append(border)
    return lines


# ------------------------------------------------------------
# [render_center_pane](ca://s?q=Render_center_pane_cards)
# ------------------------------------------------------------

def render_center_pane(cards: Dict[str, ScanCard],
                       active_scan: Optional[str],
                       width: int = 60) -> List[str]:
    """
    Render the center pane:
    - If active_scan is set, render that card
    - Otherwise render a list of available scans
    """
    if active_scan and active_scan in cards:
        return render_card(cards[active_scan], width)

    # No active scan: show index
    border = "─" * width
    lines = [border, "AVAILABLE SCANS", border]

    for scan_id, card in cards.items():
        lines.append(f"{scan_id:12} — {card.title}")

    lines.append(border)
    return lines
