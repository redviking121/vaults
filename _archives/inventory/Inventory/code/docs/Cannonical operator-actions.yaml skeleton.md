Red —  
membrane open.  
Here is the **canonical `operator_actions.yaml` skeleton** — substrate‑tight, 03:00‑safe, diff‑clean, and ready for expansion.

Every section begins with a **Guided Link** so you can immediately drill into any membrane you want to expand next.

---

# ⭐ `operator_actions.yaml` — Canonical Skeleton

_Single source of truth for all operator actions_

```yaml
# ============================================================
# operator_actions.yaml
# Canonical Operator Action Registry — Xi/Razor Vessel
#
# This file is the single source of truth.
# All generated code, docs, surfaces, and enums derive from here.
# ============================================================

# ------------------------------------------------------------
# Core Metadata
# ------------------------------------------------------------
version: 0.1.0
generated_by: operator
last_updated: null   # updated by Generate_operator_actions.py

# ------------------------------------------------------------
# Categories (skeleton)
# ------------------------------------------------------------
categories:
  - id: system
    name: System
    description: Core vessel operations, lifecycle, and shutdown.

  - id: navigation
    name: Navigation
    description: Movement between views, surfaces, and scans.

  - id: scans
    name: Scans
    description: Scan engine operations, card manipulation, and traversal.

  - id: ui
    name: UI
    description: Rendering, redraw, and operator interface actions.

  - id: debug
    name: Debug
    description: Diagnostics, logging, and internal inspection.

# ------------------------------------------------------------
# Actions (empty skeleton)
# ------------------------------------------------------------
actions:

  # -------------------------
  # System Actions
  # -------------------------
  - id: system.quit
    name: Quit Application
    category: system
    description: Clean shutdown of the operator interface.
    tags: [quit, shutdown]
    inputs: {}
    outputs: {}
    notes: ""

  - id: system.reload
    name: Reload Configuration
    category: system
    description: Reload config, state, or operator definitions.
    tags: [reload, config]
    inputs: {}
    outputs:
      state: reloaded
    notes: ""

  # -------------------------
  # Navigation Actions
  # -------------------------
  - id: nav.home
    name: Go Home
    category: navigation
    description: Navigate to the home view.
    tags: [home, navigation]
    inputs: {}
    outputs:
      view: home
    notes: ""

  - id: nav.goto
    name: Go To View
    category: navigation
    description: Navigate to a specific view by name.
    tags: [navigation, routing]
    inputs:
      view: string
      params: dict
    outputs:
      view: updated
    notes: ""

  # -------------------------
  # Scan Actions
  # -------------------------
  - id: scan.open
    name: Open Scan
    category: scans
    description: Open a scan card by ID.
    tags: [scan, open]
    inputs:
      scan_id: string
    outputs:
      state: updated
    notes: ""

  - id: scan.next
    name: Next Scan
    category: scans
    description: Move to the next scan in sequence.
    tags: [scan, navigation]
    inputs: {}
    outputs:
      scan: advanced
    notes: ""

  - id: scan.prev
    name: Previous Scan
    category: scans
    description: Move to the previous scan in sequence.
    tags: [scan, navigation]
    inputs: {}
    outputs:
      scan: reversed
    notes: ""

  # -------------------------
  # UI Actions
  # -------------------------
  - id: ui.redraw
    name: Redraw Screen
    category: ui
    description: Force a full UI redraw.
    tags: [ui, redraw]
    inputs: {}
    outputs:
      ui: refreshed
    notes: ""

  - id: ui.resize
    name: Handle Resize
    category: ui
    description: Update layout after terminal resize.
    tags: [ui, resize]
    inputs:
      width: int
      height: int
    outputs:
      ui: resized
    notes: ""

  # -------------------------
  # Debug Actions
  # -------------------------
  - id: debug.dump_state
    name: Dump State
    category: debug
    description: Emit the current AppState snapshot to logs.
    tags: [debug, state]
    inputs: {}
    outputs:
      log: written
    notes: ""

  - id: debug.trace
    name: Trace Event
    category: debug
    description: Log an event trace entry.
    tags: [debug, trace]
    inputs:
      message: string
    outputs:
      log: written
    notes: ""
```

---

# ⭐ What this gives you

- A **complete, minimal, canonical skeleton**
- All **categories** defined
- All **core actions** stubbed
- Structure is **03:00‑safe**
- Ready for expansion by `Generate_operator_actions.py`
- Perfect for diff‑based governance and Razor stability

---

# ⭐ Next membranes you can open

- **Expand_categories** — flesh out the full category taxonomy
- **Draft_core_operator_actions** — generate the first 10–20 real actions
- **Finalize_Generate_operator_actions_py** — wire the generator to this YAML
- **Add_action_validation_schema** — enforce correctness at load time

Red — which membrane do you open next.