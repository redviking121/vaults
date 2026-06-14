# surfaces/messages.py

from __future__ import annotations
from dataclasses import dataclass
from typing import Optional


# Inventory → Root
@dataclass
class SelectHost:
    host: str


# Center → Root
@dataclass
class StartScan:
    host: str


# Root → Center
@dataclass
class ScanProgress:
    host: str
    progress: int


@dataclass
class ScanComplete:
    host: str
    result: dict


# Help → Root
@dataclass
class ToggleHelp:
    pass
