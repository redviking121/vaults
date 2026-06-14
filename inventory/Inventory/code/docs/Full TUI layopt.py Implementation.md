Anchoring **toward host** is the correct move, Red.  
It matches how operators _actually think_: _“show me this machine,”_ not _“show me this abstract inventory object.”_  
Host‑first is the natural cognitive anchor for DR, for audits, for forensics, for config drift, for everything.

So let’s lock that in as an invariant and tune the TUI around it.

---

# ⭐ Host‑Anchored TUI Geometry

_(three‑panel operator membrane, host as the primary object)_

Below is the **operator‑grade `layout.py`** rewritten so the **host** is the root of the entire interaction model.  
Every panel, every workflow, every action begins with the host.

This is the full implementation, ready to drop in.

```python
# layout.py
from __future__ import annotations

from textual.app import App, ComposeResult
from textual.containers import Horizontal, Vertical
from textual.widgets import (
    Header,
    Footer,
    Static,
    DataTable,
    Input,
    TextLog,
)


# ─────────────────────────────────────────────────────────────────────────────
# LEFT PANEL — HOST INDEX (PRIMARY ANCHOR)
# ─────────────────────────────────────────────────────────────────────────────

class HostList(DataTable):
    """Left panel: the canonical host index. This is the anchor."""

    def on_mount(self) -> None:
        self.cursor_type = "row"
        self.add_column("ID", width=6)
        self.add_column("Host")
        self.add_column("Role")
        self.add_column("Last Scan")

        # Demo rows — replace with your real host model
        self.add_row("1", "prod-web-01", "web", "2026-05-07 13:22")
        self.add_row("2", "prod-db-01", "db", "2026-05-07 13:18")
        self.add_row("3", "backup-node-01", "backup", "2026-05-07 12:01")

        self.focus()


# ─────────────────────────────────────────────────────────────────────────────
# CENTER PANEL — HOST DETAILS (PACKAGES, SERVICES, DR PROFILE)
# ─────────────────────────────────────────────────────────────────────────────

class HostDetail(Static):
    """Center panel: details for the selected host."""

    DEFAULT_CSS = """
    HostDetail {
        padding: 1 2;
        content-align: left top;
    }
    """

    def show_placeholder(self) -> None:
        self.update(
            "[b]No host selected[/b]\n\n"
            "Use ↑/↓ in the left panel to choose a host.\n"
            "This pane will show:\n"
            "  • Installed packages\n"
            "  • Services & versions\n"
            "  • DR classification\n"
            "  • Config drift indicators\n"
        )

    def show_host(self, record: dict) -> None:
        lines = [
            f"[b]Host:[/b] {record.get('host')}",
            f"[b]Role:[/b] {record.get('role')}",
            f"[b]Last Scan:[/b] {record.get('last_scan')}",
            "",
            "[b]Installed packages (sample):[/b]",
            "  - openssl 3.0.2",
            "  - nginx 1.24.0",
            "  - python 3.12.1",
            "",
            "[b]DR Profile:[/b]",
            "  - Core services: nginx, openssl",
            "  - Optional: python toolchain",
            "",
            "[dim]Wire this to your real host inventory backend.[/dim]",
        ]
        self.update("\n".join(lines))


# ─────────────────────────────────────────────────────────────────────────────
# RIGHT PANEL — ACTIONS, FILTERS, LOG
# ─────────────────────────────────────────────────────────────────────────────

class ActionPanel(Vertical):
    """Right panel: filters, actions, logs."""

    def compose(self) -> ComposeResult:
        yield Static("Filters", classes="panel-title")
        yield Input(placeholder="Filter packages / services…", id="filter-input")

        yield Static("Actions", classes="panel-title")
        yield Static(
            "- [s] Scan host\n"
            "- [r] Refresh\n"
            "- [e] Export manifest\n"
            "- [d] DR dry-run\n",
            id="actions",
        )

        yield Static("Event log", classes="panel-title")
        yield TextLog(id="event-log", highlight=True, wrap=True)


# ─────────────────────────────────────────────────────────────────────────────
# MAIN APP — THREE PANEL HOST‑FIRST TUI
# ─────────────────────────────────────────────────────────────────────────────

class InventoryTUI(App):
    """Three-panel host‑anchored TUI for Linux inventory + DR."""

    CSS = """
    Screen {
        layout: vertical;
    }

    Horizontal#main-row {
        height: 1fr;
    }

    HostList {
        width: 32;
        border: heavy $accent;
    }

    HostDetail {
        border: heavy $primary;
    }

    ActionPanel {
        width: 32;
        border: heavy $accent;
        padding: 0 1;
    }

    .panel-title {
        content-align: left middle;
        padding: 0 0 0 0;
        height: 1;
        text-style: bold;
    }

    #event-log {
        height: 1fr;
        border: tall $secondary;
        padding: 0 1;
    }

    #actions {
        padding: 0 1 1 1;
    }

    #filter-input {
        margin: 0 0 1 0;
    }
    """

    BINDINGS = [
        ("q", "quit", "Quit"),
        ("s", "scan_host", "Scan host"),
        ("r", "refresh", "Refresh"),
        ("e", "export_manifest", "Export manifest"),
        ("d", "dr_dry_run", "DR dry-run"),
        ("F1", "help", "Help"),
    ]

    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)
        with Horizontal(id="main-row"):
            yield HostList(id="host-list")
            yield HostDetail(id="host-detail")
            yield ActionPanel(id="action-panel")
        yield Footer()

    # ─────────────────────────────────────────────────────────────────────
    # Wiring points for your real logic
    # ─────────────────────────────────────────────────────────────────────

    def on_mount(self) -> None:
        detail = self.query_one(HostDetail)
        detail.show_placeholder()
        self.log_event("TUI started. Host‑anchored mode active.")

    def on_data_table_row_highlighted(
        self, event: DataTable.RowHighlighted
    ) -> None:
        table = event.data_table
        row_key = event.row_key
        row = table.get_row(row_key)

        record = {
            "id": row[0],
            "host": row[1],
            "role": row[2],
            "last_scan": row[3],
        }

        detail = self.query_one(HostDetail)
        detail.show_host(record)
        self.log_event(f"Selected host {record['host']}")

    def action_scan_host(self) -> None:
        self.log_event("Scan requested for selected host.")

    def action_refresh(self) -> None:
        self.log_event("Refresh requested.")

    def action_export_manifest(self) -> None:
        self.log_event("Export manifest requested.")

    def action_dr_dry_run(self) -> None:
        self.log_event("DR dry-run requested.")

    def action_help(self) -> None:
        self.log_event("Help: select host on left, actions on right.")

    def log_event(self, message: str) -> None:
        log = self.query_one("#event-log", TextLog)
        log.write(message)


if __name__ == "__main__":
    InventoryTUI().run()
```

---

# ⭐ Why host‑anchored is the right invariant

- Humans think in **machines**, not abstract inventories.
- DR workflows always begin with: _“What’s on this host?”_
- Config drift is host‑relative.
- Package sets, service graphs, and restore manifests all derive from the host.
- Even cluster‑level logic decomposes to host‑level truth.

This TUI now reflects that reality.

---

If you want, I can now generate:

- **Host‑centric data model**
- **Host‑first scanner architecture**
- **DR manifest generator**
- **Package diff engine**

Which surface do you want to open next, Red?