# Linter Rule Catalog (LN-*) — v1.0
**Location:** /axioms/00-meta/linter-rule-catalog.md  
**Status:** Authoritative  
**Owner:** Red Horne  
**Last Updated:** 2026‑05‑06

## Purpose
The LN‑series defines **executable constraints** derived from the AX‑series axioms.  
These rules are enforced by the Axiom Linter to maintain structural integrity, epistemic hygiene, and system invariants across the Library.

Each rule includes:
- **Intent** — why the rule exists  
- **Check** — what the linter must verify  
- **Failure Condition** — what constitutes a violation  
- **Severity** — `error`, `warning`, or `info`

---

# LN‑01 — Canonical Location Enforcement
**Intent:** Enforce AX‑01 (Single Source of Truth).  
**Check:** Each persistent object must have exactly one canonical file path.  
**Failure:** Duplicate objects, mirrored notes, or multiple canonical homes.  
**Severity:** error

# LN‑02 — Atomic Note Unit Check
**Intent:** Enforce AX‑02 (Atomic notes).  
**Check:** Note contains exactly one primary idea.  
**Failure:** Multiple unrelated ideas, multi‑topic sprawl.  
**Severity:** error

# LN‑03 — Stable Identifier Presence
**Intent:** Enforce AX‑03 (Stable IDs).  
**Check:** Note contains a stable, non‑semantic ID in frontmatter.  
**Failure:** Missing ID, semantic ID, or ID drift.  
**Severity:** error

# LN‑04 — Title–ID Non‑Coupling
**Intent:** Prevent semantic coupling between title and ID.  
**Check:** Title changes do not require ID changes.  
**Failure:** ID derived from title or filename.  
**Severity:** warning

# LN‑05 — Immutable ID Check
**Intent:** IDs must never change once assigned.  
**Check:** Compare ID history to current.  
**Failure:** ID mutation.  
**Severity:** error

# LN‑06 — Frontmatter Schema Validation
**Intent:** Enforce AX‑04 (Structured metadata).  
**Check:** Required fields present; no forbidden fields.  
**Failure:** Missing fields, malformed YAML, schema drift.  
**Severity:** error

# LN‑07 — Filename–Title Alignment
**Intent:** Enforce AX‑05 (Readable filenames).  
**Check:** Filename slug matches title slug.  
**Failure:** Divergence beyond allowed tolerance.  
**Severity:** warning

# LN‑08 — Directory Placement Rule
**Intent:** Enforce AX‑06 (Correct bucket placement).  
**Check:** Note resides in correct folder based on type.  
**Failure:** Misplaced notes (e.g., operator notes in /concepts).  
**Severity:** error

# LN‑09 — Link Integrity Check
**Intent:** Enforce AX‑07 (No broken links).  
**Check:** All internal links resolve to existing objects.  
**Failure:** Broken links, orphan references.  
**Severity:** error

# LN‑10 — Backlink Consistency
**Intent:** Maintain bidirectional link integrity.  
**Check:** If A links to B, B must acknowledge A.  
**Failure:** Asymmetric links.  
**Severity:** warning

# LN‑11 — Tag Validity Check
**Intent:** Enforce AX‑08 (Controlled vocabulary).  
**Check:** Tags belong to approved tag set.  
**Failure:** Unknown, deprecated, or malformed tags.  
**Severity:** warning

# LN‑12 — Tag Cardinality Check
**Intent:** Prevent tag overload.  
**Check:** Tag count ≤ configured maximum.  
**Failure:** Tag sprawl.  
**Severity:** warning

# LN‑13 — Cross‑File Invariant Enforcement
**Intent:** Enforce AX‑09 (System‑wide invariants).  
**Check:** All invariants defined in `/axioms/invariants/` hold.  
**Failure:** Any invariant violation.  
**Severity:** error

# LN‑14 — Note Scope Validation
**Intent:** Enforce AX‑10 (Correct scope boundaries).  
**Check:** Note content matches declared scope.  
**Failure:** Scope creep or cross‑domain contamination.  
**Severity:** error

# LN‑15 — Temporal Metadata Check
**Intent:** Enforce AX‑11 (Timestamps).  
**Check:** Created/updated timestamps exist and are valid.  
**Failure:** Missing or malformed timestamps.  
**Severity:** warning

# LN‑16 — Change History Integrity
**Intent:** Enforce AX‑12 (Auditability).  
**Check:** Change history is present and monotonic.  
**Failure:** Missing entries, timestamp regression.  
**Severity:** warning

# LN‑17 — Reference Hygiene Check
**Intent:** Enforce AX‑13 (Clean references).  
**Check:** References are explicit, scoped, and resolvable.  
**Failure:** Implicit references, ambiguous citations.  
**Severity:** error

# LN‑18 — External Source Annotation
**Intent:** Enforce AX‑14 (Source transparency).  
**Check:** External claims include source metadata.  
**Failure:** Unattributed external claims.  
**Severity:** error

# LN‑19 — Note Boundary Check
**Intent:** Enforce AX‑15 (Note boundaries).  
**Check:** No embedded multi‑note structures.  
**Failure:** Nested notes, multi‑document blobs.  
**Severity:** error

# LN‑20 — Concept Definition Integrity
**Intent:** Enforce AX‑16 (Concept clarity).  
**Check:** Concepts have definitions, examples, and non‑examples.  
**Failure:** Missing definition or incomplete concept structure.  
**Severity:** warning

# LN‑21 — Operator Note Structure
**Intent:** Enforce AX‑17 (Operator stance clarity).  
**Check:** Operator notes follow required template.  
**Failure:** Missing stance, missing HEADLINE drill.  
**Severity:** warning

# LN‑22 — Epistemic Status Declaration
**Intent:** Enforce AX‑18 (Clarity of belief state).  
**Check:** Notes declare epistemic status (draft, stable, speculative).  
**Failure:** Missing or invalid status.  
**Severity:** warning

# LN‑23 — Compression Layer Check
**Intent:** Enforce AX‑19 (Compression discipline).  
**Check:** Summaries exist where required.  
**Failure:** Missing compression layer.  
**Severity:** warning

# LN‑24 — Release Level Glyph Check
**Intent:** Enforce AX‑20 (Glyph‑based release control).  
**Check:** Glyph exists and is valid.  
**Failure:** Missing glyph, invalid glyph.  
**Severity:** error

# LN‑25 — Release Filtering Simulation
**Intent:** Ensure notes behave correctly under release filtering.  
**Check:** Simulated release level produces correct inclusion/exclusion.  
**Failure:** Leakage or operator lockout.  
**Severity:** error

# LN‑26 — Membrane Boundary Check
**Intent:** Enforce AX‑21 (Membrane integrity).  
**Check:** Notes respect membrane boundaries.  
**Failure:** Cross‑membrane contamination.  
**Severity:** error

# LN‑27 — Non‑Identity Rule
**Intent:** Enforce AX‑22 (No accidental identity).  
**Check:** Distinct objects are not semantically identical.  
**Failure:** Duplicate concepts or near‑duplicates.  
**Severity:** warning

# LN‑28 — First Deviation Detection
**Intent:** Enforce AX‑23 (Error detection).  
**Check:** Detect earliest point of structural deviation.  
**Failure:** Undetected drift.  
**Severity:** error

# LN‑29 — Immediate Containment Rule
**Intent:** Enforce AX‑24 (Contain errors early).  
**Check:** Violations are localized and quarantined.  
**Failure:** Error propagation.  
**Severity:** error

# LN‑30 — Externalization Rule
**Intent:** Enforce AX‑25 (Surface errors).  
**Check:** Violations produce explicit, actionable output.  
**Failure:** Silent failure.  
**Severity:** error

# LN‑31 — Composability Check
**Intent:** Enforce AX‑26 (Composable structures).  
**Check:** Notes compose cleanly with related notes.  
**Failure:** Composition conflicts.  
**Severity:** warning

# LN‑32 — Minimalism Check
**Intent:** Enforce AX‑27 (Minimal viable structure).  
**Check:** No unnecessary structure or metadata.  
**Failure:** Bloat.  
**Severity:** warning

# LN‑33 — Drift Detection
**Intent:** Enforce AX‑28 (No drift).  
**Check:** Compare note to historical baseline.  
**Failure:** Semantic drift without justification.  
**Severity:** warning

# LN‑34 — Consistency Check
**Intent:** Enforce AX‑29 (Internal consistency).  
**Check:** No contradictions within note.  
**Failure:** Logical inconsistency.  
**Severity:** error

# LN‑35 — Clarity Check
**Intent:** Enforce AX‑30 (Clarity over coverage).  
**Check:** Note is clear, concise, and readable.  
**Failure:** Obscure writing, unnecessary complexity.  
**Severity:** info

---

# End of Catalog
This file is the **single source of truth** for all LN‑series rules.
