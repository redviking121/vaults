#!/usr/bin/env python3
"""
Generate_operator_actions.py

Purpose:
    Generate a canonical list of operator actions from a source of truth
    (e.g., YAML/JSON schema, markdown tables, or hard‑coded definitions),
    and emit them in the exact format needed by the rest of the system
    (e.g., Obsidian templates, Logseq pages, or config files).

Fill in:
    - SOURCE: where operator definitions live
    - TRANSFORM: how to normalize them
    - OUTPUT: where and how to write them
"""

from dataclasses import dataclass, asdict
from pathlib import Path
import json
import yaml  # pip install pyyaml if needed
from typing import List, Dict, Any


# ---------- Domain model ----------

@dataclass
class OperatorAction:
    id: str
    name: str
    description: str
    category: str | None = None
    tags: list[str] | None = None
    inputs: dict[str, Any] | None = None
    outputs: dict[str, Any] | None = None
    notes: str | None = None


# ---------- Config ----------

ROOT = Path(__file__).resolve().parent
SOURCE_FILE = ROOT / "operator_actions.yaml"   # or .json, etc.
OUTPUT_DIR = ROOT / "generated"
OUTPUT_JSON = OUTPUT_DIR / "operator_actions.json"
OUTPUT_MD_DIR = OUTPUT_DIR / "md"              # e.g., one note per action


# ---------- Load ----------

def load_operator_actions_from_yaml(path: Path) -> List[OperatorAction]:
    with path.open("r", encoding="utf-8") as f:
        raw = yaml.safe_load(f) or []
    actions: List[OperatorAction] = []
    for item in raw:
        actions.append(
            OperatorAction(
                id=item["id"],
                name=item["name"],
                description=item.get("description", ""),
                category=item.get("category"),
                tags=item.get("tags", []),
                inputs=item.get("inputs"),
                outputs=item.get("outputs"),
                notes=item.get("notes"),
            )
        )
    return actions


# ---------- Transform / validate ----------

def validate_actions(actions: List[OperatorAction]) -> None:
    seen_ids = set()
    for a in actions:
        if a.id in seen_ids:
            raise ValueError(f"Duplicate operator id: {a.id}")
        seen_ids.add(a.id)
        if not a.name.strip():
            raise ValueError(f"Operator {a.id} has empty name")
        if not a.description.strip():
            raise ValueError(f"Operator {a.id} has empty description")


# ---------- Emit: JSON ----------

def write_actions_json(actions: List[OperatorAction], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = [asdict(a) for a in actions]
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ---------- Emit: Markdown notes (per action) ----------

MD_TEMPLATE = """---
id: {id}
type: operator_action
name: {name}
category: {category}
tags: {tags}
---

# {name}

**ID:** `{id}`

**Description:**  
{description}

## Inputs
{inputs}

## Outputs
{outputs}

## Notes
{notes}
"""


def format_dict_block(d: dict[str, Any] | None) -> str:
    if not d:
        return "_None_"
    lines = []
    for k, v in d.items():
        lines.append(f"- **{k}:** {v}")
    return "\n".join(lines)


def write_actions_markdown(actions: List[OperatorAction], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for a in actions:
        md = MD_TEMPLATE.format(
            id=a.id,
            name=a.name,
            category=a.category or "_uncategorized_",
            tags=", ".join(a.tags or []),
            description=a.description or "_No description_",
            inputs=format_dict_block(a.inputs),
            outputs=format_dict_block(a.outputs),
            notes=a.notes or "_None_",
        )
        filename = f"{a.id} - {a.name}.md".replace("/", "-")
        (out_dir / filename).write_text(md, encoding="utf-8")


# ---------- Main ----------

def main() -> None:
    actions = load_operator_actions_from_yaml(SOURCE_FILE)
    validate_actions(actions)
    write_actions_json(actions, OUTPUT_JSON)
    write_actions_markdown(actions, OUTPUT_MD_DIR)
    print(f"Generated {len(actions)} operator actions.")


if __name__ == "__main__":
    main()
