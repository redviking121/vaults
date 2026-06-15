#!/usr/bin/env python3
# three_pane_layout.py
# Three-pane TUI layout for the Xi/Razor vessel
#
# Responsibilities:
# - Define the structural UI skeleton
# - Provide left/center/right panes
# - Expose a LayoutSurface the event loop can mount
# - Keep all logic pure layout (no scan logic here)

from textual.app import ComposeResult
from textual.containers import Container, Horizontal
from textual.widget import Widget
from textual.widgets import Static


# ------------------------------------------------------------
# Left Pane — Inventory / Host List
# ------------------------------------------------------------

class InventoryPane(Static):
    """Left pane: host list, snapshots, profiles."""

    def compose(self) -> ComposeResult:
        yield Static("Inventory", classes="pane-title")
        yield Static("No data loaded", id="inventory-body")


# ------------------------------------------------------------
# Center Pane — Detail / Scan Cards
# ------------------------------------------------------------

class DetailPane(Static):
    """Center pane: scan results, operator cards."""

    def compose(self) -> ComposeResult:
        yield Static("Details", classes="pane-title")
        yield Static("Awaiting selection…", id="detail-body")


# ------------------------------------------------------------
# Right Pane — Inspector / Log / Filters
# ------------------------------------------------------------

class InspectorPane(Static):
    """Right pane: filters, metadata, event log."""

    def compose(self) -> ComposeResult:
        yield Static("Inspector", classes="pane-title")
        yield Static("No events yet", id="inspector-body")


# ------------------------------------------------------------
# Layout Surface
# ------------------------------------------------------------

class ThreePaneLayout(Widget):
    """Top-level layout container for the vessel."""

    # [compose_layout](ca://s?q=Compose_three_pane_layout)
    def compose(self) -> ComposeResult:
        """Compose the three-pane horizontal layout."""
        yield Horizontal(
            InventoryPane(id="left-pane"),
            DetailPane(id="center-pane"),
            InspectorPane(id="right-pane"),
            id="three-pane-root",
        )


# ------------------------------------------------------------
# Style Sheet (inline for now; can be externalized later)
# ------------------------------------------------------------

CSS = """
#three-pane-root {
    height: 100%;
}

#left-pane {
    width: 25%;
    border: solid #444;
}

#center-pane {
    width: 50%;
    border: solid #555;
}

#right-pane {
    width: 25%;
    border: solid #444;
}

.pane-title {
    background: #333;
    color: #eee;
    padding: 1;
    text-style: bold;
}
"""
