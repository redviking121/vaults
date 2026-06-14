#!/usr/bin/env python3
# integration_logseq.py
# Logseq binding for the Xi/Razor vessel
#
# Responsibilities:
# - Bind to a Logseq graph directory (Markdown-native)
# - Read/write pages, journals, and blocks
# - Provide deterministic surfaces for scans and state
# - Keep all mutation behind the commit membrane
# - Emit a LogseqBundle for the vessel

import os
import re
import uuid
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Any


# ------------------------------------------------------------
# Bundle
# ------------------------------------------------------------

class LogseqBundle:
    """
    Immutable snapshot of the Logseq graph.
    """
    def __init__(self, root: Path, pages: Dict[str, Path], journals: Dict[str, Path]):
        self.root = root
        self.pages = pages
        self.journals = journals

    def __repr__(self):
        return f"<LogseqBundle pages={len(self.pages)} journals={len(self.journals)}>"


# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------

def _slugify(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]+", "-", name.strip()).lower()


def _today_journal_name() -> str:
    return datetime.now().strftime("%Y_%m_%d.md")


# ------------------------------------------------------------
# API Surface
# ------------------------------------------------------------

# 1. ----------------------------------------------------------
# [load_graph](ca://s?q=Load_Logseq_graph)
# ----------------------------------------------------------

def load_graph(root: str) -> LogseqBundle:
    """
    Load the Logseq graph directory and return a LogseqBundle.
    """
    root_path = Path(root).expanduser().resolve()

    pages_dir = root_path / "pages"
    journals_dir = root_path / "journals"

    pages = {p.stem: p for p in pages_dir.glob("*.md")}
    journals = {j.stem: j for j in journals_dir.glob("*.md")}

    return LogseqBundle(root_path, pages, journals)


# 2. ----------------------------------------------------------
# [read_page](ca://s?q=Read_Logseq_page)
# ----------------------------------------------------------

def read_page(bundle: LogseqBundle, name: str) -> Optional[str]:
    """
    Return the raw Markdown of a page.
    """
    slug = _slugify(name)
    path = bundle.pages.get(slug)
    if not path or not path.exists():
        return None
    return path.read_text(encoding="utf-8")


# 3. ----------------------------------------------------------
# [write_page](ca://s?q=Write_Logseq_page)
# ----------------------------------------------------------

def write_page(bundle: LogseqBundle, name: str, content: str) -> Path:
    """
    Write or overwrite a page.
    """
    slug = _slugify(name)
    path = bundle.root / "pages" / f"{slug}.md"
    path.write_text(content, encoding="utf-8")
    return path


# 4. ----------------------------------------------------------
# [append_to_page](ca://s?q=Append_to_Logseq_page)
# ----------------------------------------------------------

def append_to_page(bundle: LogseqBundle, name: str, block: str) -> Path:
    """
    Append a block to a page.
    """
    slug = _slugify(name)
    path = bundle.root / "pages" / f"{slug}.md"

    if not path.exists():
        path.write_text(f"- {block}\n", encoding="utf-8")
    else:
        with path.open("a", encoding="utf-8") as f:
            f.write(f"- {block}\n")

    return path


# 5. ----------------------------------------------------------
# [read_journal](ca://s?q=Read_Logseq_journal)
# ----------------------------------------------------------

def read_journal(bundle: LogseqBundle, date: Optional[str] = None) -> Optional[str]:
    """
    Read a journal entry by date (YYYY_MM_DD).
    """
    if date is None:
        date = datetime.now().strftime("%Y_%m_%d")

    path = bundle.journals.get(date)
    if not path or not path.exists():
        return None

    return path.read_text(encoding="utf-8")


# 6. ----------------------------------------------------------
# [write_journal](ca://s?q=Write_Logseq_journal)
# ----------------------------------------------------------

def write_journal(bundle: LogseqBundle, content: str, date: Optional[str] = None) -> Path:
    """
    Write or overwrite a journal entry.
    """
    if date is None:
        date = datetime.now().strftime("%Y_%m_%d")

    path = bundle.root / "journals" / f"{date}.md"
    path.write_text(content, encoding="utf-8")
    return path


# 7. ----------------------------------------------------------
# [append_to_journal](ca://s?q=Append_to_Logseq_journal)
# ----------------------------------------------------------

def append_to_journal(bundle: LogseqBundle, block: str, date: Optional[str] = None) -> Path:
    """
    Append a block to a journal entry.
    """
    if date is None:
        date = datetime.now().strftime("%Y_%m_%d")

    path = bundle.root / "journals" / f"{date}.md"

    if not path.exists():
        path.write_text(f"- {block}\n", encoding="utf-8")
    else:
        with path.open("a", encoding="utf-8") as f:
            f.write(f"- {block}\n")

    return path


# 8. ----------------------------------------------------------
# [search_blocks](ca://s?q=Search_Logseq_blocks)
# ----------------------------------------------------------

def search_blocks(bundle: LogseqBundle, pattern: str) -> List[Dict[str, Any]]:
    """
    Search all pages and journals for blocks matching a regex pattern.
    Returns a list of {file, line, text}.
    """
    regex = re.compile(pattern, re.IGNORECASE)
    results = []

    for collection in (bundle.pages, bundle.journals):
        for name, path in collection.items():
            if not path.exists():
                continue

            with path.open("r", encoding="utf-8") as f:
                for idx, line in enumerate(f.readlines(), start=1):
                    if regex.search(line):
                        results.append({
                            "file": str(path),
                            "line": idx,
                            "text": line.strip()
                        })

    return results


# 9. ----------------------------------------------------------
# [emit_bundle](ca://s?q=Emit_Logseq_bundle)
# ----------------------------------------------------------

def emit_bundle(root: str) -> LogseqBundle:
    """
    High-level entry point: load and return a LogseqBundle.
    """
    return load_graph(root)
