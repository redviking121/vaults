# Axiom Rule Catalog (v1.0)
**Location:** /axioms/00-meta/axiom-rule-catalog.md  
**Status:** Authoritative  
**Owner:** Red Horne  
**Last Updated:** 2026‑05‑05

## Purpose
This catalog defines the structural, epistemic, and operational rules that govern the Axiom System itself.  
These axioms apply to all persistent knowledge objects in the Library and form the basis for linter enforcement, membrane behavior, and system invariants.

---

## AX‑01 — Single Source of Truth
Every persistent fact, concept, or model must have exactly one canonical home. All other appearances are references, not copies.

## AX‑02 — Atomicity of Notes
A note must contain exactly one primary idea, claim, or question. If multiple ideas coexist, the note must be split.

## AX‑03 — Stable Non‑Semantic Identifiers
Every persistent object must have a stable ID that never changes, regardless of title, location, or content evolution.

## AX‑04 — Titles Are Handles, Not Truth
Titles are ergonomic entry points for humans. The body of the note is authoritative; titles may change freely.

## AX‑05 — Typed Link Semantics
Links must encode their intent (defines, supports, contradicts, depends on, etc.). Untyped links are temporary scaffolding only.

## AX‑06 — Directional Causality
Causal or dependency relationships must be directional (A → B). Cycles require explicit marking and justification.

## AX‑07 — Context‑Bound Meaning
Every concept exists within a defined context. Reuse across contexts must declare alignment or divergence.

## AX‑08 — No Orphan Claims
Every non‑trivial claim must be supported by a source, observation, reasoning chain, or explicit hypothesis tag.

## AX‑09 — Temporal Explicitness
Knowledge that changes over time must carry timestamps or versions. Temporal scope must be explicit or structurally inferable.

## AX‑10 — Reversible Operations
Structural operations (merge, split, rename, move) must preserve enough metadata to reconstruct prior states.

## AX‑11 — Content / Workflow Separation
Enduring knowledge must be stored separately from transient workflow artifacts. Their lifecycles remain distinct.

## AX‑12 — Minimal Viable Structure
Structure is added only when it reduces ambiguity or friction. Avoid premature taxonomies and overfitted schemas.

## AX‑13 — Human‑Legible First
All persistent artifacts must be readable by a future human without external tools. Machine structure must not obscure narrative.

## AX‑14 — Explicit Uncertainty
Uncertainty, confidence levels, and open questions must be explicitly marked. Distinguish known, unknown, and unknowable.

## AX‑15 — Locality of Modification
Edits must be applied at the smallest scope that fully captures the change. All impacted notes must be updated or flagged.

## AX‑16 — Composability Over Completeness
Schemas, rules, and concepts must compose cleanly. When conflicts arise, composability outranks maximal coverage.

## AX‑17 — Provenance Preservation
Every piece of knowledge must retain traceable provenance: where it came from, how it was derived, and by whom.

## AX‑18 — Intent Before Action
Every structural change must record operator intent. The system must distinguish what changed from why it changed.

## AX‑19 — No Silent Mutation
Any change that alters meaning, scope, or semantics must be explicitly logged or versioned. Silent drift is prohibited.

## AX‑20 — Layer‑Correct Behavior
Every operation must occur at the correct layer of the stack (intent → command → event → template → artifact).  
Cross‑layer leakage is a violation.

## AX‑21 — Predictable Failure Modes
When a rule cannot be satisfied, the system must fail in a predictable, diagnosable way, not degrade silently.

## AX‑22 — Explicit Boundaries
Every object must declare its boundaries: what it covers, what it excludes, and what assumptions it relies on.

## AX‑23 — No Hidden State
All state relevant to interpretation must be visible in the artifact or its metadata. Hidden or implicit state is forbidden.

## AX‑24 — Referential Integrity
All links must resolve to valid targets. Broken links must be surfaced, not ignored.

## AX‑25 — Invariant Preservation
Any operation that would violate a system invariant must be blocked or require explicit override with justification.

## AX‑26 — Canonical Formatting
All persistent artifacts must follow canonical formatting rules to ensure consistency, diff‑friendliness, and machine parsing.

## AX‑27 — Explicit Scope of Validity
Every claim or model must declare the domain in which it holds. Out‑of‑scope application must be marked as extrapolation.

## AX‑28 — No Ambiguous Entities
Every entity must have a single, unambiguous identity. If two notes describe the same entity, they must be merged or linked via identity resolution.

## AX‑29 — Operator Transparency
Operators must be able to see and understand how the system interprets their actions. No opaque transformations.

## AX‑30 — System Evolvability
Axioms themselves may evolve, but only through explicit governance, versioning, and migration paths.

---

## Versioning
- **v1.0 (2026‑05‑05):** Initial authoritative release.

