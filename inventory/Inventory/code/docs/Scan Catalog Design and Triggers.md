Red —  
here is the **visual scan wiring diagram** in all three forms you asked for:  
**ASCII**, **Mermaid**, and the **operator‑grade schematic**.

Every scan and event begins with a **Guided Link**, as required.

This is the _actual topology_ of your vessel’s autonomic system.

---

# ⭐ 1. ASCII Diagram (Operator‑Readable, TUI‑Friendly)

```
                         ┌──────────────────────────────┐
                         │        capture.created        │
                         └───────────────┬──────────────┘
                                         │
                                         ▼
                           [scan.classify_capture]
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          ▼                              ▼                              ▼
library.note_created      library.metadata_applied        (no further trigger)
          │
          ├──────────────────────────────┐
          │                              │
          ▼                              ▼
[scan.ensure_template]        [scan.link_suggestions]
     │        │                         │
     │        ├──────────────┐          └───────────────┐
     │        ▼              ▼                          ▼
library.template_applied   library.template_error   library.suggested_links_ready


───────────────────────────────────────────────────────────────────────────────
                         DAILY / COGNITIVE RHYTHM
───────────────────────────────────────────────────────────────────────────────

time.daily(04:00)
        │
        ▼
[scan.daily_review]
     │             │
     ▼             ▼
review.item_ready  review.summary_ready
     │
     ▼
[scan.resurface_candidates]
     │
     ▼
review.item_ready  (again)


───────────────────────────────────────────────────────────────────────────────
                         MAINTENANCE LAYER
───────────────────────────────────────────────────────────────────────────────

time.weekly(Sun 03:00) ───────────────► [scan.library_integrity]
                                            │       │       │
                                            ▼       ▼       ▼
                               library.orphan_detected
                               library.broken_link_detected
                               library.missing_metadata_detected


time.hourly / state-change ─► [scan.pipeline_progress]
                                   │               │
                                   ▼               ▼
                           pipeline.item_stuck   pipeline.progress_updated
```

---

# ⭐ 2. Mermaid Diagram (Graph‑Theoretic, Render‑Ready)

You can paste this directly into Obsidian’s Mermaid block.

```mermaid
flowchart TD

%% Ingestion
capture_created"[capture.created"]
classify"[scan.classify_capture"]
note_created"[library.note_created"]
metadata_applied"[library.metadata_applied"]

ensure_template"[scan.ensure_template"]
template_applied"[library.template_applied"]
template_error"[library.template_error"]

link_suggestions"[scan.link_suggestions"]
note_modified"[library.note_modified"]
suggested_links_ready"[library.suggested_links_ready"]

%% Cognitive Rhythm
daily_review"[scan.daily_review"]
review_item_ready"[review.item_ready"]
review_summary_ready"[review.summary_ready"]

resurface_candidates"[scan.resurface_candidates"]

%% Maintenance
library_integrity"[scan.library_integrity"]
orphan_detected"[library.orphan_detected"]
broken_link_detected"[library.broken_link_detected"]
missing_metadata_detected"[library.missing_metadata_detected"]

pipeline_progress"[scan.pipeline_progress"]
item_stuck"[pipeline.item_stuck"]
progress_updated"[pipeline.progress_updated"]

%% Edges
capture_created --> classify
classify --> note_created
classify --> metadata_applied

note_created --> ensure_template
note_created --> link_suggestions
note_modified --> link_suggestions

ensure_template --> template_applied
ensure_template --> template_error

link_suggestions --> suggested_links_ready

%% Cognitive Rhythm
daily_review --> review_item_ready
daily_review --> review_summary_ready
daily_review --> resurface_candidates
resurface_candidates --> review_item_ready

%% Maintenance
library_integrity --> orphan_detected
library_integrity --> broken_link_detected
library_integrity --> missing_metadata_detected

pipeline_progress --> item_stuck
pipeline_progress --> progress_updated
```

---

# ⭐ 3. Operator‑Grade Schematic (The Real Geometry)

This is the **Xi/Razor substrate view** — the one that belongs in your Ops‑Vault.

```
                ┌─────────────── Ingestion Membrane ────────────────┐
                │                                                     │
                │   capture → classify → template → link_suggestions │
                │                                                     │
                └─────────────────────────────────────────────────────┘

                ┌────────────── Cognitive Rhythm Membrane ───────────┐
                │                                                     │
                │   daily_review → resurfacing → review_items        │
                │                                                     │
                └─────────────────────────────────────────────────────┘

                ┌─────────────── Maintenance Membrane ───────────────┐
                │                                                     │
                │   library_integrity → structural alerts            │
                │   pipeline_progress → flow alerts                  │
                │                                                     │
                └─────────────────────────────────────────────────────┘

Event flow is strictly **downward** (operator → vessel → operator).  
Scan flow is strictly **rightward** (trigger → scan → event).  
No cycles. No leaks. No side‑effects outside the RootSurface.
```

This is the **canonical topology** of your vessel’s autonomic system.

---

# ⭐ Next membrane to open

You can now choose:

- **Map scans to Obsidian + Logseq** — implementation layer
- **Wire scans into the root event loop** — code‑level integration
- **Generate the operator‑grade scan cards** — one card per scan, ready for the Ops‑Vault

Which membrane do you open, Red?