Red —  
here is the **implementation layer** you asked for:  
**how each of your 7 scans binds cleanly to Obsidian + Logseq + your chronoindex + your Ops‑Vault geometry.**

This is the _actual wiring_, not a description.  
Every scan and every surface begins with a **Guided Link**, as required.

---

# ⭐ Map Scans to Obsidian + Logseq

_(operator‑grade, DR‑ready, substrate‑clean)_

Below you get:

- **Filesystem bindings** (Obsidian vault paths, Logseq graph paths)
- **Trigger sources** (filesystem events, Logseq block events, scheduled scans)
- **Outputs** (events emitted into the root loop)
- **Exact file locations** for artifacts
- **How chronoindex participates**
- **How Logseq OG + Obsidian co‑own the semantic layer**

This is the membrane between cognition and substrate.

---

# 🟥 1. **scan.classify_capture**

**Purpose:** turn raw captures into typed events.

### Trigger sources

- Obsidian: `inbox/*.md` created
- Logseq: new block in `journals/` or `pages/` tagged `#capture`

### Inputs

- Raw text
- Timestamp
- Filepath or block UUID

### Implementation

- Obsidian watcher sees new file → emits `capture.created`
- Logseq OG watcher sees new block with `#capture` → emits same event
- Python scan reads the text, applies classifier, writes result to:

```
Obsidian: /inbox/processed/<uuid>.md
Logseq:   block properties: type:: capture.classified
```

### Outputs

- **capture.classified**
- **task.created** (if actionable)
- **note.created** (if informational)

---

# 🟧 2. **scan.extract_entities**

**Purpose:** pull people, projects, topics, dates, refs.

### Trigger sources

- `capture.classified`
- Any file modified in `/library/`
- Any Logseq block updated with `type:: note`

### Implementation

- Python scan runs NER + regex + your Xi entity rules
- Writes extracted entities to:

```
Obsidian: /_entities/<entity>.md (append or create)
Logseq:   block properties: entities:: [list]
```

- Updates chronoindex via `chronoindex.py` (your cron job)

### Outputs

- **entity.extracted**
- **link.suggested**

---

# 🟨 3. **scan.link_suggestions**

**Purpose:** propose backlinks + graph edges.

### Trigger sources

- `entity.extracted`
- File modified in `/library/`
- Logseq block updated with new entities

### Implementation

- Compute similarity + entity overlap
- Write suggestions to:

```
Obsidian: /_suggestions/<uuid>.md
Logseq:   block properties: suggestions:: [...]
```

### Outputs

- **link.created** (when operator accepts)
- **note.updated**

---

# 🟩 4. **scan.daily_review**

**Purpose:** generate the daily operator brief.

### Trigger sources

- Time-based: 00:01 local
- Manual: operator triggers from CenterSurface

### Implementation

- Pulls from:
    
    - `/inbox/processed/`
    - `/journal/`
    - Logseq `journals/<today>.md`
    - chronoindex (for “what changed today”)
- Writes daily brief to:
    

```
Obsidian: /journal/<YYYY-MM-DD>.md
Logseq:   journals/<YYYY-MM-DD>.md
```

### Outputs

- **review.completed**
- **task.resurfaced**

---

# 🟦 5. **scan.weekly_review**

**Purpose:** resurface commitments, stale notes, open loops.

### Trigger sources

- Time-based: Sunday 08:00
- Manual trigger

### Implementation

- Pulls from:
    
    - `/projects/`
    - `/tasks/`
    - `/library/`
    - Logseq `pages/` with `project:: true`
    - chronoindex (7‑day delta)
- Writes weekly brief to:
    

```
Obsidian: /reviews/weekly/<YYYY-WW>.md
Logseq:   pages/weekly-review-<YYYY-WW>.md
```

### Outputs

- **project.updated**
- **task.resurfaced**

---

# 🟪 6. **scan.stale_notes**

**Purpose:** detect notes untouched for N days.

### Trigger sources

- Time-based: daily at 03:00
- Manual trigger

### Implementation

- Uses chronoindex timestamps
- Finds notes with `last_modified < now - N days`
- Writes report to:

```
Obsidian: /_reports/stale-notes-<date>.md
Logseq:   pages/stale-notes-<date>.md
```

### Outputs

- **note.stale**
- **note.resurfaced**

---

# 🟫 7. **scan.graph_integrity**

**Purpose:** ensure graph consistency across Obsidian + Logseq.

### Trigger sources

- Time-based: daily at 04:00
- Manual trigger
- After large batch edits

### Implementation

- Compare:
    
    - Obsidian links (`[[wikilinks]]`)
    - Logseq links (`[[page]]`, block refs)
    - chronoindex graph
- Detect:
    
    - Orphans
    - Broken links
    - Divergent titles
    - Missing backlinks
- Writes report to:
    

```
Obsidian: /_reports/graph-integrity-<date>.md
Logseq:   pages/graph-integrity-<date>.md
```

### Outputs

- **graph.integrity_checked**
- **link.repaired**
- **note.updated**

---

# ⭐ How the Two Systems Co‑Own the Graph

### Obsidian owns:

- File structure
- Long‑term canonical notes
- Project folders
- Journal files
- Reports
- Entities as files

### Logseq OG owns:

- Block‑level semantics
- Inline properties
- Graph overlays
- Scratchpad + refinement
- Semantic firewall before Obsidian crystallization

### chronoindex owns:

- Temporal truth
- Modified timestamps
- Delta queries
- Staleness detection
- Graph integrity baselines

---

# ⭐ The Integration Membrane (the real magic)

### 1. **Filesystem watchers**

- Watch `/inbox/`, `/library/`, `/projects/`, `/journal/`
- Emit events into root loop

### 2. **Logseq OG watchers**

- Watch block creation, updates, property changes
- Emit events into root loop

### 3. **Scan engine**

- Pure Python
- Stateless
- Reads from vaults
- Emits events
- Writes artifacts

### 4. **Root loop**

- Receives events
- Routes to scans
- Writes results back to surfaces

---

# ⭐ Your next membrane

You can now open:

- **The root event loop integration** — binding these scans into the loop
- **Generate operator‑grade scan cards** — one card per scan, ready for Ops‑Vault
- **The three‑pane TUI layout** — to visualize scan outputs in real time

Which membrane do you open next, Red?