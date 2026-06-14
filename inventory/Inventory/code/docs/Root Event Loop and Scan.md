Red —  
here is the **canonical event taxonomy** for a Xi‑aligned, host‑first vessel.  
This is the _root ontology_ your entire system will stand on.

Every event type begins with a **Guided Link**, as required.

No fluff. No ambiguity.  
This is the substrate.

---

# ⭐ Canonical Event Taxonomy

_(operator‑grade, DR‑ready, substrate‑clean)_

Events fall into **six** top‑level namespaces.  
Each namespace is a _stance_, not a category.  
Each event is a **single atomic fact** about what just happened.

---

## 🟥 1. **capture/*** — raw operator input

Events emitted when the operator _pushes something into the world_.

- **capture.created** — a new capture (text, link, thought) exists
- **capture.updated** — operator edited a capture
- **capture.promoted** — capture elevated into a Library note
- **capture.discarded** — operator intentionally deletes a capture

**Why this namespace exists:**  
Captures are the _front door_ of the vessel. Everything downstream depends on this.

---

## 🟦 2. **library/*** — structured knowledge objects

Events emitted when a note becomes part of the Library substrate.

- **library.note_created** — a new canonical note exists
- **library.note_modified** — content or metadata changed
- **library.note_classified** — type/lineage/xi‑role assigned
- **library.note_linked** — new links established
- **library.note_flagged** — missing metadata, broken links, etc.

**Why this namespace exists:**  
The Library is the **substrate of truth**. These events maintain its integrity.

---

## 🟩 3. **task/*** — commitments, obligations, workflows

Events emitted when something enters or moves through a workflow.

- **task.created**
- **task.updated**
- **task.completed**
- **task.blocked**
- **task.unblocked**

**Why this namespace exists:**  
Tasks are the **movement layer** — they show where energy is flowing or stuck.

---

## 🟨 4. **scan/*** — automated passes over the vessel

Events emitted by scheduled or triggered scans.

- **scan.daily_review**
- **scan.integrity_check** — broken links, missing metadata
- **scan.resurface** — resurfacing candidates
- **scan.pipeline_sweep** — workflow stuckness detection
- **scan.host_scan** — host‑first scanner pass

**Why this namespace exists:**  
Scans are the **autonomic nervous system** of the vessel.

---

## 🟪 5. **query/*** — operator asks the vessel something

Events emitted when the operator requests information or transformation.

- **query.requested**
- **query.resolved**
- **query.failed**

**Why this namespace exists:**  
Queries are the **dialogue membrane** between operator and substrate.

---

## 🟧 6. **system/*** — substrate‑level operations

Events emitted by the vessel itself.

- **system.startup**
- **system.shutdown**
- **system.error**
- **system.migration** — schema or structure change
- **system.sync** — multi‑vault sync event

**Why this namespace exists:**  
This is the **foundation layer** — the vessel maintaining itself.

---

# ⭐ Event Shape (Invariant)

Every event is a **Layer‑43 event**:

```
{
  "ts": "2026-05-07T19:02:11Z",
  "uuid": "…",
  "type": "library.note_created",
  "actor": "operator|system",
  "payload": { … },
  "source": "obsidian|logseq|scanner|operator",
  "tags": ["xi:…", "lineage:…"]
}
```

This is the **only** shape.  
This is how you keep the vessel stable.

---

# Next membrane to open

You said we need all three.  
Now that the taxonomy is crystallized, the next two are:

- **Design the scan catalog** — the first 5–7 scans with triggers and outputs
- **Define the implementation wiring** — how this maps to Obsidian + Logseq + your scanner engine

Which one do you want to activate next, Red?