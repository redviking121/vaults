#!/usr/bin/env python3
# temporal_scan.py
# Time-indexed analysis over pages/blocks for the Xi/Razor vessel

from __future__ import annotations
import re
import datetime
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class ScanResult:
    name: str
    payload: Dict[str, Any]
    emitted_event: str
    ts: float


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

# [parse_timestamp](ca://s?q=Parse_temporal_timestamp)
def parse_timestamp(value: str) -> Optional[datetime.datetime]:
    """
    Parse a timestamp from common Obsidian/Logseq formats:
    - 2026-05-07
    - 2026-05-07T14:32
    - <2026-05-07 14:32>
    - [2026-05-07]
    - 2026/05/07
    """
    if not value:
        return None

    candidates = [
        "%Y-%m-%d",
        "%Y-%m-%dT%H:%M",
        "%Y-%m-%d %H:%M",
        "%Y/%m/%d",
    ]

    cleaned = value.strip("<>[]() ")

    for fmt in candidates:
        try:
            return datetime.datetime.strptime(cleaned, fmt)
        except ValueError:
            continue

    return None


# [extract_timestamps_from_text](ca://s?q=Extract_timestamps_from_text)
def extract_timestamps_from_text(text: str) -> List[datetime.datetime]:
    """
    Extract timestamps from arbitrary page/block text.
    """
    patterns = [
        r"\d{4}-\d{2}-\d{2}",
        r"\d{4}/\d{2}/\d{2}",
        r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}",
        r"<\d{4}-\d{2}-\d{2} \d{2}:\d{2}>",
    ]

    found = []
    for pat in patterns:
        for match in re.findall(pat, text):
            ts = parse_timestamp(match)
            if ts:
                found.append(ts)

    return found


# ---------------------------------------------------------------------------
# Temporal classification
# ---------------------------------------------------------------------------

# [classify_temporal_state](ca://s?q=Classify_temporal_state)
def classify_temporal_state(now: datetime.datetime, ts: Optional[datetime.datetime]) -> str:
    """
    Classify temporal state of a page/block.
    """
    if ts is None:
        return "unknown"

    delta = now - ts

    if delta.days < 1:
        return "new"
    if delta.days < 7:
        return "recent"
    if delta.days < 30:
        return "aging"
    if delta.days < 180:
        return "stale"
    return "dormant"


# ---------------------------------------------------------------------------
# Main scan function
# ---------------------------------------------------------------------------

# [temporal_scan](ca://s?q=Run_temporal_scan)
def temporal_scan(host: Any, state_bundle: Any) -> ScanResult:
    """
    Perform time-indexed analysis over pages and blocks.
    """
    now = datetime.datetime.utcnow()

    pages = host.list_pages()
    results = []

    for page_name in pages:
        page_text = host.read_page(page_name)
        page_meta = host.page_metadata(page_name)

        # Extract timestamps
        ts_candidates = []

        # From metadata
        for key in ("created", "modified", "updated", "date"):
            if key in page_meta:
                ts = parse_timestamp(str(page_meta[key]))
                if ts:
                    ts_candidates.append(ts)

        # From text
        ts_candidates.extend(extract_timestamps_from_text(page_text))

        # Pick the most recent timestamp
        ts = max(ts_candidates) if ts_candidates else None
        state = classify_temporal_state(now, ts)

        # Block-level timestamps
        blocks = host.read_blocks(page_name)
        block_info = []
        for block in blocks:
            block_ts_candidates = extract_timestamps_from_text(block.text)
            block_ts = max(block_ts_candidates) if block_ts_candidates else None
            block_state = classify_temporal_state(now, block_ts)

            block_info.append({
                "block_id": block.block_id,
                "timestamp": block_ts.isoformat() if block_ts else None,
                "state": block_state,
            })

        results.append({
            "page": page_name,
            "page_timestamp": ts.isoformat() if ts else None,
            "page_state": state,
            "blocks": block_info,
        })

    payload = {
        "scanned_at": now.isoformat(),
        "pages": results,
    }

    return ScanResult(
        name="temporal_scan",
        payload=payload,
        emitted_event="temporal_scan_complete",
        ts=now.timestamp(),
    )


# ---------------------------------------------------------------------------
# Registration surface
# ---------------------------------------------------------------------------

# [register](ca://s?q=Register_temporal_scan)
def register() -> Dict[str, Any]:
    """
    Return a registry entry for ScannerEngine.
    """
    return {
        "name": "temporal_scan",
        "fn": temporal_scan,
        "description": "Time-indexed analysis over pages and blocks",
    }
