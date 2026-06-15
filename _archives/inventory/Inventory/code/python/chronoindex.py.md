#!/usr/bin/env python3
# chronoindex.py
# Chronological index generator for the Xi/Razor vessel
#
# Responsibilities:
# - Maintain a deterministic chronological ledger
# - Assign stable chronological IDs
# - Emit Markdown, JSON, and CSV index formats
# - Provide a high-level apply() hook for the vessel
# - Feed temporal state into the root event loop

import os
import json
import csv
from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List, Dict, Any, Optional


# ------------------------------------------------------------
# Data Structures
# ------------------------------------------------------------

@dataclass
class ChronoEntry:
    chrono_id: int
    timestamp: str
    path: str
    title: str


@dataclass
class ChronoIndex:
    entries: List[ChronoEntry]

    def to_dict(self) -> Dict[str, Any]:
        return {"entries": [asdict(e) for e in self.entries]}


# ------------------------------------------------------------
# [load_index](ca://s?q=Load_chronoindex) — load ledger from disk
# ------------------------------------------------------------

def load_index(path: str) -> ChronoIndex:
    if not os.path.exists(path):
        return ChronoIndex(entries=[])
    with open(path, "r") as f:
        data = json.load(f)
    entries = [ChronoEntry(**e) for e in data.get("entries", [])]
    return ChronoIndex(entries=entries)


# ------------------------------------------------------------
# [save_index](ca://s?q=Save_chronoindex) — persist ledger to disk
# ------------------------------------------------------------

def save_index(path: str, index: ChronoIndex) -> None:
    with open(path, "w") as f:
        json.dump(index.to_dict(), f, indent=2)


# ------------------------------------------------------------
# [next_chrono_id](ca://s?q=Next_chrono_id) — deterministic ID allocator
# ------------------------------------------------------------

def next_chrono_id(index: ChronoIndex) -> int:
    if not index.entries:
        return 1
    return max(e.chrono_id for e in index.entries) + 1


# ------------------------------------------------------------
# [scan_vault](ca://s?q=Scan_vault_for_index) — walk vault, collect files
# ------------------------------------------------------------

def scan_vault(vault_path: str) -> List[str]:
    collected = []
    for root, _, files in os.walk(vault_path):
        for f in files:
            if f.endswith(".md") and not f.startswith("_index"):
                collected.append(os.path.join(root, f))
    return sorted(collected)


# ------------------------------------------------------------
# [extract_title](ca://s?q=Extract_title_from_markdown) — first-line title
# ------------------------------------------------------------

def extract_title(path: str) -> str:
    try:
        with open(path, "r") as f:
            first = f.readline().strip()
            if first.startswith("#"):
                return first.lstrip("# ").strip()
    except:
        pass
    return os.path.basename(path)


# ------------------------------------------------------------
# [append_new_entries](ca://s?q=Append_new_chrono_entries) — update ledger
# ------------------------------------------------------------

def append_new_entries(index: ChronoIndex, vault_files: List[str]) -> ChronoIndex:
    known_paths = {e.path for e in index.entries}
    new_files = [p for p in vault_files if p not in known_paths]

    for path in new_files:
        entry = ChronoEntry(
            chrono_id=next_chrono_id(index),
            timestamp=datetime.now().isoformat(),
            path=path,
            title=extract_title(path),
        )
        index.entries.append(entry)

    index.entries.sort(key=lambda e: e.chrono_id)
    return index


# ------------------------------------------------------------
# [emit_markdown](ca://s?q=Emit_markdown_index) — write _index.md
# ------------------------------------------------------------

def emit_markdown(index: ChronoIndex, out_path: str) -> None:
    lines = ["# Chronological Index", ""]
    for e in index.entries:
        rel = e.path
        lines.append(f"- **{e.chrono_id}** — [{e.title}]({rel}) — {e.timestamp}")
    with open(out_path, "w") as f:
        f.write("\n".join(lines))


# ------------------------------------------------------------
# [emit_json](ca://s?q=Emit_json_index) — write _index.json
# ------------------------------------------------------------

def emit_json(index: ChronoIndex, out_path: str) -> None:
    with open(out_path, "w") as f:
        json.dump(index.to_dict(), f, indent=2)


# ------------------------------------------------------------
# [emit_csv](ca://s?q=Emit_csv_index) — write _index.csv
# ------------------------------------------------------------

def emit_csv(index: ChronoIndex, out_path: str) -> None:
    with open(out_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["chrono_id", "timestamp", "path", "title"])
        for e in index.entries:
            writer.writerow([e.chrono_id, e.timestamp, e.path, e.title])


# ------------------------------------------------------------
# [apply](ca://s?q=Apply_chronoindex_update) — vessel-facing entrypoint
# ------------------------------------------------------------

def apply(state: Dict[str, Any]) -> Dict[str, Any]:
    vault_path = state.get("vault_path")
    index_path = state.get("index_path", os.path.join(vault_path, "_index.json"))
    md_path = state.get("md_path", os.path.join(vault_path, "_index.md"))
    csv_path = state.get("csv_path", os.path.join(vault_path, "_index.csv"))

    index = load_index(index_path)
    vault_files = scan_vault(vault_path)
    index = append_new_entries(index, vault_files)

    save_index(index_path, index)
    emit_markdown(index, md_path)
    emit_csv(index, csv_path)

    # Update vessel temporal state
    state["temporal"] = {
        "last_update": datetime.now().isoformat(),
        "entries": len(index.entries),
        "latest_id": index.entries[-1].chrono_id if index.entries else None,
    }

    return state
