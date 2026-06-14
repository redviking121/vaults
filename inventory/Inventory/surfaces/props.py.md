# surfaces/props.py

from __future__ import annotations
from dataclasses import dataclass
from typing import Any, Dict, Optional, List


@dataclass(frozen=True)
class InventoryProps:
    hosts: List[str]
    selected: Optional[str]


@dataclass(frozen=True)
class CenterProps:
    mode: str
    host: Optional[str]
    scan_result: Optional[Dict[str, Any]]
    progress: Optional[int]


@dataclass(frozen=True)
class StatusProps:
    message: str
    level: str  # "info", "warn", "error"


@dataclass(frozen=True)
class HelpProps:
    visible: bool
