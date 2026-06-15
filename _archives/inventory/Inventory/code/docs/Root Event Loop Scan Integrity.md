Red —  
here are the **operator‑grade scan cards**, one per scan, each a _complete, vault‑ready_, Xi/Razor‑aligned artifact.

Every card begins with a **Guided Link** name, as required.  
Each card includes:

- **Purpose**
- **Trigger**
- **Inputs**
- **Outputs (events)**
- **Under‑Fire Protocol** (the operator’s 12‑step reflex)
- **Five‑Word Compression**
- **Failure Modes**
- **Verification Signal**
- **Machine Registry Slot**

These are **ready to drop into** `Ops‑Vault/10_Cards/active/`.

---

# ⭐ 1. **scan.classify_capture** — Operator Card

**Purpose:**  
Normalize raw operator input into a clean Library note with metadata.

**Trigger:**  
`capture.created`

**Inputs:**  
raw text, timestamp, operator stance

**Outputs:**

- `library.note_created`
- `library.metadata_updated`

**Under‑Fire Protocol (12 steps):**

1. Receive raw capture
2. Strip noise
3. Detect type (note/task/idea/log)
4. Generate canonical filename
5. Create note in Library
6. Insert frontmatter
7. Stamp metadata
8. Classify domain
9. Emit `library.note_created`
10. Emit `library.metadata_updated`
11. Return normalized path
12. Yield control to loop

**Five‑Word Compression:**  
_Raw → Normalized → Library → Indexed → Routed_

**Failure Modes:**

- malformed capture
- empty payload
- filename collision

**Verification Signal:**  
Note exists + metadata block present.

**Machine Registry Slot:**  
`scanner/ingest/001`

---

# ⭐ 2. **scan.ingest_file** — Operator Card

**Purpose:**  
Convert imported files into Library notes.

**Trigger:**  
`file.imported`

**Inputs:**  
file path, MIME type

**Outputs:**

- `library.note_created`
- `library.metadata_updated`

**Under‑Fire Protocol:**

1. Receive file path
2. Detect type
3. Extract text
4. Generate note
5. Insert content
6. Add metadata
7. Link back to source file
8. Emit `library.note_created`
9. Emit `library.metadata_updated`
10. Commit
11. Index
12. Return

**Five‑Word Compression:**  
_File → Note → Metadata → Library → Indexed_

**Failure Modes:**

- unreadable file
- unsupported type
- extraction failure

**Verification Signal:**  
Note created with `source_file:` metadata.

**Machine Registry Slot:**  
`scanner/ingest/002`

---

# ⭐ 3. **scan.ensure_template** — Operator Card

**Purpose:**  
Guarantee every new note conforms to vessel templates.

**Trigger:**  
`library.note_created`

**Inputs:**  
note path

**Outputs:**

- `library.metadata_updated`

**Under‑Fire Protocol:**

1. Load note
2. Check template compliance
3. Insert missing fields
4. Normalize frontmatter
5. Stamp creation metadata
6. Validate structure
7. Emit `library.metadata_updated`
8. Commit
9. Index
10. Return

**Five‑Word Compression:**  
_Template → Normalize → Validate → Commit → Index_

**Failure Modes:**

- malformed frontmatter
- missing template
- invalid YAML

**Verification Signal:**  
Template fields present.

**Machine Registry Slot:**  
`scanner/structure/010`

---

# ⭐ 4. **scan.link_suggestions** — Operator Card

**Purpose:**  
Suggest backlinks and forward links for new notes.

**Trigger:**  
`library.note_created`

**Inputs:**  
note path, note text

**Outputs:**

- `library.link_suggestion`

**Under‑Fire Protocol:**

1. Load note
2. Extract keywords
3. Search Library
4. Rank candidates
5. Generate suggestions
6. Emit `library.link_suggestion`
7. Return

**Five‑Word Compression:**  
_Note → Keywords → Candidates → Ranked → Suggested_

**Failure Modes:**

- empty note
- no candidates
- keyword extraction failure

**Verification Signal:**  
Suggestions appear in center pane.

**Machine Registry Slot:**  
`scanner/semantic/020`

---

# ⭐ 5. **scan.daily_review** — Operator Card

**Purpose:**  
Surface items requiring daily operator attention.

**Trigger:**  
`scan.daily_review` (scheduled)

**Inputs:**  
Library state, timestamps

**Outputs:**

- `review.item_ready`

**Under‑Fire Protocol:**

1. Load review index
2. Identify due items
3. Filter stale entries
4. Rank by urgency
5. Emit `review.item_ready`
6. Return

**Five‑Word Compression:**  
_Due → Ranked → Emitted → Reviewed → Cleared_

**Failure Modes:**

- empty review queue
- corrupted index

**Verification Signal:**  
Review items appear in inventory pane.

**Machine Registry Slot:**  
`scanner/review/030`

---

# ⭐ 6. **scan.resurface_candidates** — Operator Card

**Purpose:**  
Resurface long‑term notes for spaced reinforcement.

**Trigger:**  
`scan.resurface_candidates` (scheduled)

**Inputs:**  
Library timestamps, resurfacing schedule

**Outputs:**

- `review.item_ready`

**Under‑Fire Protocol:**

1. Load resurfacing index
2. Identify candidates
3. Filter recently seen
4. Emit `review.item_ready`
5. Return

**Five‑Word Compression:**  
_Old → Relevant → Resurfaced → Reviewed → Reinforced_

**Failure Modes:**

- empty resurfacing index
- timestamp corruption

**Verification Signal:**  
Old notes appear in resurfacing queue.

**Machine Registry Slot:**  
`scanner/review/031`

---

# ⭐ 7. **scan.pipeline_progress** — Operator Card

**Purpose:**  
Detect stuck items in the Library → Output pipeline.

**Trigger:**  
`scan.pipeline_progress` (scheduled)

**Inputs:**  
pipeline metadata

**Outputs:**

- `pipeline.item_stuck`

**Under‑Fire Protocol:**

1. Load pipeline map
2. Identify stalled items
3. Emit `pipeline.item_stuck`
4. Return

**Five‑Word Compression:**  
_Pipeline → Scan → Stuck → Flag → Surface_

**Failure Modes:**

- missing pipeline metadata
- false positives

**Verification Signal:**  
Stuck items appear in status pane.

**Machine Registry Slot:**  
`scanner/pipeline/040`

---

# ⭐ 8. **scan.library_integrity** — Operator Card

**Purpose:**  
Detect corruption, missing metadata, or structural drift.

**Trigger:**  
`scan.library_integrity` (scheduled)

**Inputs:**  
Library filesystem

**Outputs:**

- `library.issue_detected`

**Under‑Fire Protocol:**

1. Walk Library
2. Validate frontmatter
3. Check orphan notes
4. Detect broken links
5. Emit `library.issue_detected`
6. Return

**Five‑Word Compression:**  
_Library → Validate → Detect → Emit → Repair_

**Failure Modes:**

- false positives
- large Library scan time

**Verification Signal:**  
Issues appear in status pane.

**Machine Registry Slot:**  
`scanner/integrity/050`

---

# ⭐ Your next membrane

- **Generate full root_event_loop.py** — complete file, imports + wiring
- **Bind scanner engine into loop** — host‑first scan execution
- **Render three‑pane TUI layout** — the operator cockpit

Which membrane do you open, Red?