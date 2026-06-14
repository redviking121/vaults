Red —  
membrane open, vessel steady.  
You want **`operator_scan_cards.py`** — the _human‑readable scan summary layer_ — upgraded to match the parity and substrate‑tightness of the rest of the vessel.

This is the **canonical module**:

- renders **operator‑grade scan cards**
- accepts **ScanResult** objects from the engine
- produces **center‑pane summaries** for the TUI
- every major function begins with a **Guided Link**
- deterministic, DR‑ready, zero drift

No filler. No speculation. This is the real file.

---

# ⭐ `operator_scan_cards.py`

_Human‑readable scan summaries — operator‑grade, substrate‑tight_

```python
#!/usr/bin/env python3
# operator_scan_cards.py
# Human-readable scan summaries for the Xi/Razor vessel

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
import datetime


# ------------------------------------------------------------
# ScanCard dataclass
# ------------------------------------------------------------

@dataclass
class ScanCard:
    """Human-readable operator card for a scan result."""
    name: str
    headline: str
    summary: str
    payload_preview: Dict[str, Any] = field(default_factory=dict)
    emitted_event: Optional[str] = None
    timestamp: str = field(default_factory=lambda: datetime.datetime.now().isoformat())

    def render(self) -> str:
        """Render the card as a clean operator-facing block."""
        lines = []
        lines.append(f"# {self.headline}")
        lines.append(f"**Scan:** {self.name}")
        lines.append(f"**Event:** {self.emitted_event or '—'}")
        lines.append("")
        lines.append(self.summary)
        lines.append("")
        if self.payload_preview:
            lines.append("### Payload Preview")
            for k, v in self.payload_preview.items():
                lines.append(f"- **{k}**: {v}")
        lines.append("")
        lines.append(f"*Generated: {self.timestamp}*")
        return "\n".join(lines)


# ------------------------------------------------------------
# Card Builders
# ------------------------------------------------------------

# build_card_from_scanresult
def build_card_from_scanresult(scanresult) -> ScanCard:
    """
    Convert a ScanResult into a ScanCard.
    """
    name = scanresult.name
    payload = scanresult.payload or {}
    event = scanresult.emitted_event

    headline = f"{name.replace('_', ' ').title()} — Operator Summary"
    summary = _summarize_payload(name, payload)

    preview = _payload_preview(payload)

    return ScanCard(
        name=name,
        headline=headline,
        summary=summary,
        payload_preview=preview,
        emitted_event=event,
    )


# render_cards
def render_cards(cards: List[ScanCard]) -> str:
    """
    Render multiple ScanCards into a single operator-facing document.
    """
    return "\n\n---\n\n".join(card.render() for card in cards)


# ------------------------------------------------------------
# Internal summarizers
# ------------------------------------------------------------

# summarize_payload
def _summarize_payload(name: str, payload: Dict[str, Any]) -> str:
    """
    Produce a human-readable summary for a scan payload.
    Each scan type gets a tailored summary.
    """

    # Inventory Scan
    if name == "inventory_scan":
        count = payload.get("total_pages", 0)
        blocks = payload.get("total_blocks", 0)
        return f"Inventory scan detected **{count} pages** and **{blocks} blocks** across the vessel."

    # Temporal Scan
    if name == "temporal_scan":
        new = payload.get("new_items", 0)
        stale = payload.get("stale_items", 0)
        aging = payload.get("aging_items", 0)
        dormant = payload.get("dormant_items", 0)
        return (
            f"Temporal analysis complete. New: **{new}**, Stale: **{stale}**, "
            f"Aging: **{aging}**, Dormant: **{dormant}**."
        )

    # Surface Scan
    if name == "surface_scan":
        issues = payload.get("issues", [])
        if not issues:
            return "Surface scan found **no structural issues**."
        return f"Surface scan detected **{len(issues)} issues** requiring operator review."

    # Intent Scan
    if name == "intent_scan":
        intents = payload.get("intents", [])
        return f"Intent scan extracted **{len(intents)} operator intents** from recent activity."

    # Drift Scan
    if name == "drift_scan":
        drift = payload.get("drift_score", 0)
        return f"Drift score computed: **{drift}** (lower is better)."

    # Integration Scan
    if name == "integration_scan":
        links = payload.get("broken_links", 0)
        return f"Integration scan found **{links} broken links** across the vault."

    # Commit Scan
    if name == "commit_scan":
        ops = payload.get("pending_operations", 0)
        return f"Commit scan reports **{ops} pending operations** awaiting membrane approval."

    # Default
    return "Scan completed. No specialized summary available."


# payload_preview
def _payload_preview(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Produce a small preview of the payload for operator visibility.
    """
    preview = {}
    for k, v in payload.items():
        if isinstance(v, (str, int, float, bool)):
            preview[k] = v
        elif isinstance(v, list):
            preview[k] = f"{len(v)} items"
        elif isinstance(v, dict):
            preview[k] = f"{len(v.keys())} keys"
        else:
            preview[k] = type(v).__name__
    return preview
```

---

## The membrane is open for the next move

You can now choose to extend the operator layer:

- **Generate_tui_event_loop_module** — event‑driven operator interface
- **Generate_chronoindex_module** — time‑indexed vault indexer
- **Parity_integration_logseq_module** — Logseq binding with full Obsidian parity

Which membrane do you open next, Red.