---
title: # Layer‑43 plugin command map
timestamp: 2026-05-14T14:24:00
uid: 5aa88ea9
source: 202605141424.md
tags: [status:actionable, struct:future, struct:list]
---
# Layer‑43 plugin command map

> Version: `1.0.0` • Scope: Obsidian desktop • Owner: Red • Status: **Authoritative**

---

## 1. Command model

- **Namespace:** `layer43` (plugin), `l43` (command IDs)
- **Form:** `l43.<domain>.<verb>[.<qualifier>]`
- **Scope tags:** `@global`, `@editor`, `@file`, `@vault`, `@dev`
- **Surfaces:**
    - **Command palette:** all commands
    - **Keybindings:** only “hot” path commands
    - **Context menus:** file/folder/editor where useful

---

## 2. Command taxonomy

- **Core:** plugin lifecycle, help, quick access
- **Capture:** fast creation of notes, tasks, and signals
- **Navigation:** moving between layers, views, and anchors
- **Review:** structured passes over notes and queues
- **Ops:** maintenance, diagnostics, exports
- **Dev:** debug and scaffolding for future work

---

## 3. Command map (authoritative list)

### 3.1 Core

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.core.open-panel`|Open Layer‑43 panel|@global|`Ctrl+Alt+L`|Main entry; toggles side panel|
|`l43.core.command-palette`|Layer‑43: command palette|@global|—|Filters only Layer‑43 commands|
|`l43.core.help`|Layer‑43: help & quick reference|@global|—|Opens in a pinned help note|
|`l43.core.toggle-mode`|Toggle operator mode (Live/Quiet)|@global|`Ctrl+Alt+M`|Affects notifications & prompts|

---

### 3.2 Capture

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.capture.quick-note`|Capture quick note to Inbox|@global|`Ctrl+Alt+N`|Minimal friction capture|
|`l43.capture.quick-task`|Capture quick task to Ops queue|@global|`Ctrl+Alt+T`|Single‑line task, auto‑timestamp|
|`l43.capture.signal`|Capture signal (observation/event)|@global|—|Uses configured “Signal” template|
|`l43.capture.clip-selection`|Capture current selection to Inbox|@editor|`Ctrl+Alt+X`|Adds source backlink|
|`l43.capture.from-clipboard`|Capture clipboard as new Inbox note|@global|—|For external text dumps|

---

### 3.3 Navigation

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.nav.open-inbox`|Go to Layer‑43 Inbox|@global|`Ctrl+Alt+I`|Creates if missing|
|`l43.nav.open-ops-queue`|Go to Ops queue|@global|`Ctrl+Alt+O`|Task triage view|
|`l43.nav.open-review-deck`|Go to Review deck|@global|—|Aggregated review surface|
|`l43.nav.jump-last-capture`|Jump to last captured item|@global|`Ctrl+Alt+J`|Uses internal “last ID” pointer|
|`l43.nav.cycle-perspective`|Cycle Layer‑43 perspectives|@global|`Ctrl+Alt+P`|e.g., Ops / Research / Writing|
|`l43.nav.open-config`|Open Layer‑43 configuration note|@global|—|Human‑readable config hub|

---

### 3.4 Review

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.review.next-inbox-item`|Review next Inbox item|@global|`Ctrl+Alt+Right`|Opens next, marks as “seen”|
|`l43.review.defer-inbox-item`|Defer current Inbox item|@editor|`Ctrl+Alt+D`|Adds defer tag/field|
|`l43.review.complete-inbox-item`|Mark current Inbox item as processed|@editor|`Ctrl+Alt+Enter`|Moves out of Inbox|
|`l43.review.next-ops-task`|Review next Ops task|@global|—|For maintenance passes|
|`l43.review.flag-for-deep-dive`|Flag current note for deep review|@editor|—|Adds `#l43/deep-dive` or field|
|`l43.review.start-daily-pass`|Start daily Layer‑43 review pass|@global|—|Guided checklist flow|

---

### 3.5 Ops

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.ops.scan-vault`|Scan vault for Layer‑43 structures|@vault|—|Indexes Inbox, queues, markers|
|`l43.ops.rebuild-index`|Rebuild Layer‑43 index|@vault|—|Safe to run anytime|
|`l43.ops.export-state`|Export Layer‑43 state snapshot|@vault|—|JSON/YAML to configured path|
|`l43.ops.validate-config`|Validate Layer‑43 configuration|@vault|—|Reports missing templates, paths|
|`l43.ops.toggle-telemetry`|Toggle anonymous telemetry|@vault|—|If implemented; default off|

---

### 3.6 Dev

|Command ID|Label|Scope|Default Key|Notes|
|---|---|---|---|---|
|`l43.dev.show-debug-panel`|Show Layer‑43 debug panel|@dev|—|Logs, timings, last commands|
|`l43.dev.dump-context`|Dump current Layer‑43 context to console|@dev|—|For troubleshooting|
|`l43.dev.seed-demo-data`|Seed demo data into sandbox folder|@dev|—|Never runs outside sandbox path|
|`l43.dev.reload-config`|Reload Layer‑43 config from disk|@dev|—|No restart required|

---

## 4. Keybinding policy

- **Hot path only:**
    - **Always bound:** `open-panel`, `quick-note`, `quick-task`, `open-inbox`, `open-ops-queue`, `next-inbox-item`, `complete-inbox-item`, `jump-last-capture`.
    - **Optional bindings:** everything else—user‑assigned.
- **No collisions:** never override existing Obsidian defaults by force; warn if conflict is detected.
- **Muscle‑memory bias:** prefer `Ctrl+Alt+<letter>` patterns for Layer‑43 to keep a recognizable “family.”

---

## 5. Surfaces and discoverability

- **Command palette:**
    - All commands prefixed with **“Layer‑43:”** in labels.
- **Panel:**
    - Left sidebar view with:
        - **Capture row:** buttons for quick note/task/signal.
        - **Queues:** Inbox, Ops, Review deck.
        - **Status:** mode, last capture, index status.
- **Help note:**
    - Generated/maintained table mirroring this command map.
    - Linked from `l43.core.help` and from the panel.

---

## 6. Implementation notes (for you and future devs)

- **Single source of truth:** this map is the canonical list; plugin code should derive labels/help from a structured config that mirrors it.
- **Non‑negotiables for v1:**
    - `core`, `capture`, `navigation`, and `review` groups implemented.
    - `ops.scan-vault`, `ops.rebuild-index`, and `ops.validate-config` present, even if minimal.
- **De‑risking hesitation:**
    - Every capture command must succeed fast, offline, and without modal dialogs.
    - On failure, log quietly and show a single, terse notification—no decision trees.

If you want, next step we can turn this into the actual TypeScript `addCommand` block set and a generated in‑vault “Command Reference” note.