Red —  
here is the **operator‑grade mapping of the TUI workflows**, expressed the way an actual operator system wants them: as _flows_, not screens; as _stances_, not UI furniture.

Every workflow begins with a **Guided Link**, as required.

---

# ⭐ Operator Workflows for the TUI

_(stance‑driven, substrate‑clean, zero‑GUI contamination)_

The TUI is not “a program with screens.”  
It is **an operator membrane** with **four canonical workflows**, each one a stance:

- **Scan Workflow** — pull reality into the model
- **Reconcile Workflow** — resolve drift between model and filesystem
- **Navigate Workflow** — move through the inventory graph
- **Inspect Workflow** — drill into a node’s invariants, metadata, and diffs

Everything else is a derivative.

---

## 1. **Scan Workflow**

**Operator stance:** _“Show me what changed.”_

### Flow

1. Operator hits the **Scan key** (default: `s`).
2. TUI triggers `core.scanner.scan()` and streams events into a **Scan Pane**.
3. As entries appear, operator can:
    - press `j/k` to move through new/changed items
    - press `Enter` to open the item in the **Inspect Workflow**
    - press `r` to jump directly into **Reconcile Workflow** for that item

### Why this matters

Scan is the **entrypoint** for all real‑world change.  
It is the “pull reality into the substrate” workflow.

---

## 2. **Reconcile Workflow**

**Operator stance:** _“Bring the model back into alignment.”_

### Flow

1. Operator enters reconcile mode from:
    - Scan results
    - Diff indicators in navigation
    - A hotkey (`R`)
2. TUI opens a **Reconcile Pane** showing:
    - left: filesystem state
    - right: model state
    - bottom: invariants / warnings
3. Operator chooses:
    - `a` — accept filesystem change
    - `m` — modify model
    - `d` — discard filesystem drift
    - `i` — inspect invariants

### Why this matters

Reconciliation is the **heart of the operator loop**.  
It is where drift is corrected and the model stays trustworthy.

---

## 3. **Navigate Workflow**

**Operator stance:** _“Move through the system as a graph.”_

### Flow

1. Operator uses `h/j/k/l` or arrow keys to traverse:
    - directories
    - inventory nodes
    - logical groupings
2. The **Navigation Pane** shows:
    - node name
    - type
    - drift indicators
    - metadata badges
3. Operator can:
    - press `Enter` → open **Inspect Workflow**
    - press `r` → open **Reconcile Workflow**
    - press `s` → rescan current subtree

### Why this matters

Navigation is not browsing.  
It is **graph traversal** of the operational substrate.

---

## 4. **Inspect Workflow**

**Operator stance:** _“Show me the truth of this node.”_

### Flow

1. Operator opens a node from:
    - Navigation
    - Scan
    - Reconcile
2. TUI shows a **Detail Pane** with:
    - invariants
    - metadata
    - diffs
    - lineage
3. Operator actions:
    - `i` — toggle invariants
    - `d` — toggle diff view
    - `m` — modify metadata
    - `b` — back to navigation

### Why this matters

Inspection is the **microscope** of the operator.  
It is where truth is verified.

---

# ⭐ How the workflows interlock

The TUI is a **four‑stance machine**:

```
Scan → Reconcile → Navigate → Inspect
   ↑                         ↓
   └─────────────── feedback ───────────────┘
```

- Scan discovers change
- Reconcile resolves it
- Navigate contextualizes it
- Inspect verifies it

This loop is the **operator geometry** of the system.

---

# ⭐ Next surfaces you can activate

- **Specify TUI keymap and panes**
- **Write first Python prototype functions**
- **Draft the Rust substrate architecture**

Which one do you want to open next, Red?