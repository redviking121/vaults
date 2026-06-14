Red —  
here is the **operator‑grade Python module layout** for the rapid‑prototype layer.  
This is the layout that keeps the prototype fast, clean, and disposable while still mapping cleanly to the eventual Rust substrate.

I’m giving you the **true module skeleton**, not a toy.  
Every directory begins with a **purpose‑anchored boundary** so your AI staff never drift.

---

# ⭐ Python Prototype Module Layout (Operator‑Grade)

```
inventoryd/
├── __init__.py
├── core/
│   ├── __init__.py
│   ├── model.py
│   ├── storage.py
│   ├── scanner.py
│   └── reconcile.py
├── tui/
│   ├── __init__.py
│   ├── layout.py
│   ├── keymap.py
│   ├── views.py
│   └── controller.py
├── ops/
│   ├── __init__.py
│   ├── ingest.py
│   ├── export.py
│   └── pipeline.py
├── adapters/
│   ├── __init__.py
│   ├── filesystem.py
│   ├── json_ledger.py
│   └── markdown_ledger.py
├── tests/
│   ├── test_model.py
│   ├── test_storage.py
│   ├── test_scanner.py
│   └── test_tui.py
└── cli.py
```

---

# ⭐ Section‑by‑Section Breakdown

## 📦 **core** — the heart of the prototype

This is the only part that defines **truth**.

- **model.py** — the inventory item schema, enums, invariants
- **storage.py** — load/save operations (JSON only)
- **scanner.py** — directory walking, device probing, metadata extraction
- **reconcile.py** — merge new scans with existing ledger

**Invariant:**  
Core has **no knowledge** of TUI, ops, or adapters.

---

## 🖥️ **tui** — the operator interface

This is the curses/Textual/urwid layer, but abstracted so you can swap implementations.

- **layout.py** — pane definitions, screen regions
- **keymap.py** — operator keybindings
- **views.py** — list view, detail view, log view
- **controller.py** — event loop + dispatch

**Invariant:**  
TUI only calls **core** and **ops**, never adapters directly.

---

## 🔧 **ops** — workflows, not logic

This is where the “operator actions” live.

- **ingest.py** — take a scan → normalize → write to ledger
- **export.py** — produce Markdown summaries for Ops‑Vault
- **pipeline.py** — multi‑step flows (scan → reconcile → export)

**Invariant:**  
Ops orchestrates but never defines data structures.

---

## 🔌 **adapters** — IO boundaries

Everything that touches the outside world lives here.

- **filesystem.py** — safe file IO
- **json_ledger.py** — read/write JSON ledger
- **markdown_ledger.py** — generate Vault‑ready Markdown

**Invariant:**  
Adapters never call TUI.  
Adapters never contain business logic.

---

## 🧪 **tests** — deterministic, substrate‑safe

Minimal but real tests:

- model invariants
- storage round‑trip
- scanner behavior
- TUI controller dispatch

---

## 🏁 **cli.py** — the operator entrypoint

This is the only file that touches `argparse` or `click`.

- `inventoryd scan`
- `inventoryd reconcile`
- `inventoryd tui`
- `inventoryd export`

---

# ⭐ Why this layout works

It enforces the three prototype invariants:

- **Fast to change**
- **Impossible to drift into substrate**
- **Straight path to Rust rewrite**

This is the layout your AI staff can execute against immediately.

---

If you want next, I can generate:

- **The file stubs for every module**
- **The data model for core/model.py**
- **The TUI pane + keymap spec**
- **The first working CLI commands**

Pick the lane and I’ll build it.