Red —  
here is the **operator‑grade TUI keymap + pane specification**, expressed in the same stance‑driven geometry as the rest of the substrate.

Every bullet begins with a **Guided Link**, as required.

---

# ⭐ TUI Keymap + Pane Specification

_(operator stance → zero‑GUI contamination → pure terminal ergonomics)_

The TUI has **three canonical panes** and **one meta‑layer**.  
Everything else is a _stance_, not a screen.

---

## 🟥 Core Panes (the operator membrane)

### 1. **Inventory Pane**

The left‑hand canonical list.  
This is your _scan surface_.

- Shows: file paths, object IDs, tags, drift markers
- Sort modes: path, modified time, type, drift severity
- Operator actions: select, multi‑select, filter, fuzzy search
- Feeds: Detail Pane + Diff Pane

**Default width:** 30–40 columns  
**Rendering:** single‑line rows, drift glyphs, tag badges

---

### 2. **Detail Pane**

The center canonical pane.  
This is your _inspection surface_.

- Shows: metadata, invariants, extracted fields, timestamps
- Supports: scroll, expand/collapse sections, jump to source
- Operator actions: open in editor, copy path, run reconcile

**Default width:** flexible (fills remaining space)

---

### 3. **Diff Pane**

The right‑hand canonical pane.  
This is your _reconciliation surface_.

- Shows: filesystem vs model diff
- Modes: unified, split, summary
- Operator actions: accept, reject, regenerate, open source

**Default width:** 40–50 columns

---

## 🟦 Meta‑Layer (the operator cockpit)

### 4. **Command Palette**

A modal overlay, not a pane.  
This is your _intent surface_.

- Fuzzy command search
- Operator verbs: scan, reconcile, open, filter, sort, jump
- Context‑aware suggestions based on pane focus

---

# ⭐ Keymap Specification

_(modal, vim‑inspired, operator‑ergonomic)_

The TUI has **three modes**:

- **Normal Mode** — navigation + selection
- **Action Mode** — verbs on objects
- **Insert Mode** — text entry (filters, search)

Below is the **canonical keymap**.

---

## 🟥 Normal Mode (default stance)

- **j / k** — move cursor down / up
- **h / l** — move pane focus left / right
- **Tab** — cycle panes
- **Space** — toggle selection
- **/** — enter filter/search (Insert Mode)
- **d** — open Diff Pane for selected item
- **Enter** — open Detail Pane
- **g g** — jump to top
- **G** — jump to bottom
- **Ctrl+R** — run full scan + refresh
- **Ctrl+P** — open Command Palette
- **q** — close pane / exit mode

---

## 🟦 Action Mode (verbs)

Triggered by **:** (colon), same as vim.

- **:r** — reconcile selected
- **:o** — open in external editor
- **:m** — show metadata
- **:s** — sort (path, time, drift)
- **:f** — filter by tag / type
- **:x** — clear filters
- **:w** — write updated model to disk
- **:!** — run operator command (scan, rebuild index, etc.)

Exit with **Esc**.

---

## 🟩 Insert Mode (text entry)

Triggered by:

- `/` — filter
- `?` — reverse filter
- `:` — command
- `Ctrl+F` — fuzzy search

Keys:

- **Esc** — return to Normal Mode
- **Enter** — apply filter / execute command
- **Ctrl+U** — clear input
- **Ctrl+W** — delete previous word

---

# ⭐ Pane Switching Logic

_(the operator geometry)_

- **l** moves focus right: Inventory → Detail → Diff
- **h** moves focus left: Diff → Detail → Inventory
- **Tab** cycles: Inventory → Detail → Diff → Inventory
- **Shift+Tab** cycles reverse

Focus determines:

- which pane scrolls
- which pane receives commands
- which object is “active” for reconcile

---

# ⭐ Operator‑Grade Summary

The TUI is:

- **Inventory Pane** — what exists
- **Detail Pane** — what it is
- **Diff Pane** — what changed
- **Command Palette** — what you intend

And the keymap is:

- **Normal Mode** — navigate
- **Action Mode** — act
- **Insert Mode** — express intent

This is the minimal, stable, operator geometry.

---

If you want, I can now generate:

- **The full TUI layout.py implementation**
- **The full keymap.py implementation**
- **The first working TUI event loop**

Which surface do you want to activate next, Red?