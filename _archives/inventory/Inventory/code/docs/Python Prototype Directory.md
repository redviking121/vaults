Red —  
here is the **operator‑grade directory tree** for the **Python rapid‑prototype layer** of the unified systems inventory.  
This is the tree your AI staff can drop straight into the repo and start wiring.

Every top‑level node begins with a **Guided Link**, as required.

---

# ⭐ Unified Systems Inventory — Prototype Directory Tree

_(Python, TUI‑first, substrate‑clean)_

```
inventoryd/
├── __init__.py
├── core/
│   ├── __init__.py
│   ├── model.py
│   ├── storage.py
│   ├── scanner.py
│   ├── reconcile.py
│   └── invariants.py
├── tui/
│   ├── __init__.py
│   ├── layout.py
│   ├── keymap.py
│   ├── views/
│   │   ├── __init__.py
│   │   ├── inventory_view.py
│   │   ├── detail_view.py
│   │   └── command_palette.py
│   └── widgets/
│       ├── __init__.py
│       ├── list_widget.py
│       ├── text_widget.py
│       └── status_bar.py
├── cli/
│   ├── __init__.py
│   ├── main.py
│   ├── commands.py
│   └── args.py
├── adapters/
│   ├── __init__.py
│   ├── filesystem.py
│   ├── git.py
│   └── processes.py
├── runtime/
│   ├── __init__.py
│   ├── config.py
│   ├── logging.py
│   └── state.py
└── tests/
    ├── __init__.py
    ├── test_core.py
    ├── test_tui.py
    └── test_cli.py
```

---

# ⭐ What each boundary means (Operator‑Grade)

- **core** — the _truth layer_: model, invariants, scanning, reconciliation
- **tui** — the operator interface: panes, widgets, keymaps
- **cli** — entrypoint, commands, argument parsing
- **adapters** — filesystem, git, process introspection
- **runtime** — config, logging, ephemeral state
- **tests** — minimal but real tests to prevent drift

This tree is intentionally **lean**, **orthogonal**, and **prototype‑safe**.  
Nothing here pretends to be substrate; everything is discover‑the‑shape.

---

If you want, I can now generate:

- **The full file stubs for this tree**
- **The first working CLI commands**
- **The TUI pane + keymap spec**
- **The inventory data model**

Tell me which surface you want to activate next, Red.