```markdown
# Xanadu.StackBoundary.v0.1

## 0. Contract identity

- **Name:** Xanadu.StackBoundary
- **Version:** v0.1
- **Role:** Root contract for the demo stack (Operator ⇄ Copilot ⇄ Obsidian ⇄ Storage)
- **Status:** Draft, but treated as authoritative until superseded

---

## 1. Purpose and scope

- **Purpose:**  
  Define the hard edge between *cognitive substrate* (Xanadu/Xi Paradox Razor) and *host stack* (Obsidian, Copilot, storage), so that:
  - Operator sovereignty is preserved
  - Structures are emergent but non-chaotic
  - The demo can evolve without breaking prior artifacts

- **In-scope:**  
  - Naming and identity rules for artifacts
  - Minimal object model for the demo
  - Allowed directions of influence between layers
  - Invariants that must hold across refactors

- **Out-of-scope (for v0.1):**  
  - Micropayment/economics
  - Multi-user governance
  - Full-blown hypertext protocol (this is a demo boundary, not the final Xanadu wire spec)

---

## 2. Stack model

- **L0 – Operator:**  
  Human intent, judgment, and final authority. All other layers are advisory or mechanical.

- **L1 – Cognitive engine:**  
  Xi Paradox Razor + Xanadu substrate concepts (frames, contradictions, emergent structure).  
  - Lives as *conceptual spec* plus *concrete patterns* in notes and links.
  - Never fully delegated; always inspectable and overridable by the Operator.

- **L2 – Logic host (Obsidian demo):**  
  - Markdown files, folders, links, and plugins.
  - Implements *demonstration logic*, not deep substrate semantics.
  - Must not silently mutate semantics defined at L1.

- **L3 – Assistant (Copilot):**  
  - Generates, transforms, and refactors content under explicit Operator prompts.
  - Bound by this contract for naming, structure, and invariants.
  - May propose structure; may not enforce it without Operator confirmation.

- **L4 – Storage (FS/Cloud):**  
  - Durable persistence (e.g., Git repo, OneDrive sync).
  - Source of truth for file contents and history.
  - No semantic authority beyond what L1–L3 define.

---

## 3. Core objects

- **Substrate:**  
  The total set of artifacts under Xanadu control (files, links, specs, indices).

- **Frame:**  
  A bounded context for meaning (e.g., project, WBS lane, spec family).  
  - Has a stable identifier and a human-readable label.
  - May contain other frames, notes, and traces.

- **Lens:**  
  A view or projection over the substrate (queries, dashboards, MOCs, indices).  
  - Must be regenerable from underlying artifacts.
  - No unique information may live *only* in a lens.

- **Thread:**  
  A coherent line of reasoning or work (e.g., “Obsidian demo logic layer”).  
  - Cross-cuts frames and files.
  - Identified by a stable name and optional tag set.

- **Trace:**  
  A recorded relationship or decision (link, justification, rationale, diff summary).  
  - Must be localizable to specific artifacts.
  - Used to reconstruct “why” after refactors.

---

## 4. Naming and identity

- **Global rule:**  
  Names must be *meaningful*, *stable enough for Git*, and *machine-parseable* where needed.

- **File naming pattern (v0.1):**  
  `<Domain>.<ObjectType>.<Slug>.v<Major>.<Minor>.md`  
  - **Domain:** `Xanadu`, `Xi`, `Demo`, etc.  
  - **ObjectType:** `Spec`, `Frame`, `Lens`, `Thread`, `Trace`, `WBS`, etc.  
  - **Slug:** short-kebab-or-dot phrase, no spaces.  
  - **Version:** semantic-ish, `v0.1`, `v1.0`, etc.

  **Example:**  
  - `Xanadu.Spec.StackBoundary.v0.1.md`  
  - `Demo.Frame.ObsidianLogicLayer.v0.1.md`  
  - `Xi.Thread.ParadoxRazor-Design.v0.2.md`

- **Identity invariants:**
  - **I1:** Once published, a filename’s *meaning* cannot be repurposed; deprecate instead of reusing.
  - **I2:** Version bumps must be monotonic per object.
  - **I3:** Cross-links must target specific versions or an explicit “latest” alias, never ambiguously.

---

## 5. Allowed flows and responsibilities

### 5.1 Operator

- **O1:** Approves or rejects structural changes (new frames, renames, major refactors).
- **O2:** Can override any assistant suggestion, including this spec.
- **O3:** Controls when content is committed, tagged, or released.

### 5.2 Cognitive engine (conceptual layer)

- **C1:** Defines what counts as a frame, lens, thread, and trace.
- **C2:** Owns paradox-handling rules (how contradictory frames are held, not resolved).
- **C3:** Provides patterns and templates that L2/L3 must respect.

### 5.3 Logic host (Obsidian demo)

- **H1:** Renders frames, lenses, threads, and traces as notes and link graphs.
- **H2:** May add convenience metadata (frontmatter, tags) but not override L1 semantics.
- **H3:** Must keep demo logic *rebuildable* from plain Markdown + this spec.

### 5.4 Assistant (Copilot)

- **A1:** When generating or refactoring, must:
  - Use the naming pattern in §4.
  - Preserve or explicitly migrate traces.
  - Call out any semantic changes to frames or lenses.

- **A2:** May propose:
  - New frames, lenses, and threads.
  - Reorganizations that reduce drift or complexity spikes.

- **A3:** Must not:
  - Introduce hidden state outside the substrate.
  - Break invariants in §6 without explicit Operator sign-off and a new spec version.

### 5.5 Storage

- **S1:** Provides durability and history (Git, sync).
- **S2:** No semantic decisions; only records what higher layers decide.
- **S3:** Must allow rollback to any prior committed state.

---

## 6. Invariants

- **Inv-1 (Operator sovereignty):**  
  No layer may auto-apply structural changes without an Operator-visible diff and confirmation.

- **Inv-2 (Plain-text substrate):**  
  All essential semantics must be recoverable from plain-text files plus this spec.  
  - No plugin-only or tool-only semantics.

- **Inv-3 (Traceability):**  
  Any non-trivial structural change (rename, split, merge, reframe) must leave a trace note:
  - What changed
  - Why it changed
  - Which artifacts are affected

- **Inv-4 (Paradox tolerance):**  
  Contradictory frames may coexist if:
  - They are explicitly scoped (e.g., `Frame.A` vs `Frame.B`),
  - Their relationship is documented in at least one trace.

- **Inv-5 (Demo safety):**  
  The Obsidian demo must remain runnable if:
  - Plugins are disabled,
  - Only Markdown + this spec are present.

---

## 7. Versioning and evolution

- **V1:** This document is the root contract for v0.1 of the stack boundary.
- **V2:** Any change to invariants (§6) or object model (§3) requires:
  - A new spec file `Xanadu.Spec.StackBoundary.v<Major>.<Minor>.md`
  - A trace describing the migration from the prior version.
- **V3:** Minor versions may extend; major versions may deprecate or break.  
  - Demo code and notes must declare which spec version they target.

---

## 8. Implementation notes for the Obsidian demo

- **Demo-1:** Place this file at a stable, obvious path, e.g.:  
  `specs/Xanadu.Spec.StackBoundary.v0.1.md`

- **Demo-2:** All demo artifacts should:
  - Link back to this spec (directly or via a central MOC/lens).
  - Declare their object type and version in filename and, optionally, frontmatter.

- **Demo-3:** Any Obsidian-specific affordance (dataview, canvas, plugin metadata) is treated as a *lens*, not a substrate extension, unless and until this spec says otherwise.

---
```