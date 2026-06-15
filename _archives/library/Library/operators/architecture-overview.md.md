# Option B Architecture Overview

## Purpose
Define the structural model of the Library system: how notes are created, classified, and maintained with zero drift.

---

## Directory Structure
Library/
  Templates/
    Classes/
      00_session.md
      00_rfc.md
      00_brief.md
      00_log.md
      00_scratch.md
      00_index.md
    Commands/
      new_session.js
      new_rfc.js
      new_brief.js
      new_log.js
      new_scratch.js
      new_index.js
  .obsidian/
    plugins/
      library-note-factory/

---

## Components
### 1. Class Templates (Layer 40)
- Define structure and metadata for each note class.
- Contain no logic.
- Pure declarative shape.

### 2. Command Templates (Layer 41)
- Templater scripts that instantiate class templates.
- Handle UID generation, timestamps, and filename patterns.

### 3. Plugin (Layer 43)
- Provides a stable interface for note creation.
- Exposes commands to Obsidian.
- Ensures consistency and prevents drift.

### 4. UI Binding Layer (Layer 42)
- Binds plugin commands to physical actions (hotkeys, menus).
- Not included in this document.

---

## Separation of Concerns
- **Library** = structured, intentional, operator‑grade notes.
- **Ops‑Vault** = operational, high‑volume, transient work.
- No commingling. No cross‑contamination.

---

## Guarantees
- Every note is born correct.
- No shell scripts required.
- No post‑hoc cleanup.
