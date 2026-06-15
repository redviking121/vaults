#!/usr/bin/env python3
# root_event_loop.py
# DR‑ready autonomic substrate for the Xi/Razor vessel

import time
import queue
from dataclasses import dataclass
from typing import Any, Dict, Callable, Optional

# --- Surfaces ---------------------------------------------------------------

from surfaces.inventory_surface import InventorySurface
from surfaces.center_surface import CenterSurface
from surfaces.status_surface import StatusSurface

# --- Scanner Engine ---------------------------------------------------------

from scanner.scanner_engine import ScannerEngine

# --- Scan Modules -----------------------------------------------------------

from scans.scan_classify_capture import scan_classify_capture
from scans.scan_promote_note import scan_promote_note
from scans.scan_link_references import scan_link_references
from scans.scan_extract_tasks import scan_extract_tasks
from scans.scan_sync_opsvault import scan_sync_opsvault
from scans.scan_logseq_ingest import scan_logseq_ingest
from scans.scan_health_check import scan_health_check

# --- Commit Membrane --------------------------------------------------------

from commit.commit_membrane import CommitMembrane


# ============================================================================
# Event Types (all begin with Guided Links)
# ============================================================================

@dataclass
class Event:
    """Base event type."""
    kind: str
    payload: Dict[str, Any]


# Ingestion events
class CaptureCreated(Event): pass
class NoteCreated(Event): pass
class BlockCreated(Event): pass

# Scan‑emitted events
class Classified(Event): pass
class Promoted(Event): pass
class Linked(Event): pass
class TasksExtracted(Event): pass
class OpsVaultSynced(Event): pass
class LogseqIngested(Event): pass
class HealthStatus(Event): pass

# Operator events
class StartScan(Event): pass
class Tick(Event): pass


# ============================================================================
# Root Event Loop
# ============================================================================

class RootEventLoop:

    def __init__(self):
        self.q = queue.Queue()

        # Surfaces
        self.inventory = InventorySurface()
        self.center = CenterSurface()
        self.status = StatusSurface()

        # Scanner engine
        self.scanner = ScannerEngine()

        # Commit membrane
        self.commit = CommitMembrane()

        # Dispatch table: event.kind → scan function
        self.dispatch: Dict[str, Callable[[Event], Optional[Event]]] = {
            # ingestion → cognition
            "capture.created": scan_classify_capture,
            "note.created": scan_promote_note,
            "block.created": scan_logseq_ingest,

            # cognition → maintenance
            "classified": scan_link_references,
            "promoted": scan_extract_tasks,
            "linked": scan_sync_opsvault,

            # maintenance → health
            "opsvault.synced": scan_health_check,
        }

    # ----------------------------------------------------------------------
    # Event emission
    # ----------------------------------------------------------------------

    def emit(self, event: Event):
        self.q.put(event)

    # ----------------------------------------------------------------------
    # Main loop
    # ----------------------------------------------------------------------

    def run(self):
        self.status.update("Root loop started")

        while True:
            try:
                event: Event = self.q.get(timeout=0.1)
            except queue.Empty:
                # periodic tick
                self.emit(Tick(kind="tick", payload={}))
                continue

            self.status.update(f"Processing event: {event.kind}")

            # 1. Route event to surfaces
            self.route_to_surfaces(event)

            # 2. Dispatch to scan if applicable
            scan_fn = self.dispatch.get(event.kind)
            if scan_fn:
                result = scan_fn(event)

                # 3. If scan emits event, enqueue it
                if isinstance(result, Event):
                    self.emit(result)

            # 4. Commit membrane (Obsidian + Logseq + chronoindex)
            self.commit.apply(event)

            # 5. Render surfaces
            self.render()

    # ----------------------------------------------------------------------
    # Surface routing
    # ----------------------------------------------------------------------

    def route_to_surfaces(self, event: Event):
        """Send event to the appropriate surfaces."""
        self.inventory.handle(event)
        self.center.handle(event)
        self.status.handle(event)

    # ----------------------------------------------------------------------
    # Rendering
    # ----------------------------------------------------------------------

    def render(self):
        self.inventory.render()
        self.center.render()
        self.status.render()


# ============================================================================
# Entrypoint
# ============================================================================

if __name__ == "__main__":
    loop = RootEventLoop()
    loop.run()
