naming-conventions.md
Xanadu Prime — Naming Conventions (Stub v0.1)
1. Purpose
Naming Conventions define the canonical patterns for naming all surfaces, directories, and structural artifacts in the Prime epoch.
They ensure that names are:

predictable

stable

lineage‑preserving

structurally meaningful

unambiguous

These conventions operationalize the Naming Governance Clause.

2. Naming Principles
All naming conventions derive from five principles:

Clarity over brevity — names must be readable and explicit

Structure over style — names reflect structural role, not aesthetics

Determinism — the same concept always yields the same naming pattern

Lineage preservation — names encode ancestry, not implementation

No ambiguity — one name = one concept

These principles prevent namespace drift.

3. File Naming Conventions
3.1 Format
All filenames follow:

Code
lowercase-with-hyphens.md
Rules:

lowercase only

hyphens as separators

no underscores

no spaces

no camelCase

no abbreviations unless declared

Examples:

technical-overview.md

substrate-axioms.md

naming-governance.md

Deepen via Repo Standards.

3.2 File Identity
A filename must encode:

concept (what it is)

role (structural, public, provenance, etc.)

epoch (if not Prime)

Prime files omit epoch suffixes because Prime is the root.

4. Directory Naming Conventions
4.1 Canonical Directories
Prime directories follow:

Code
lowercase-with-hyphens/
Except for epoch directories, which follow:

Code
NN_EPOCH_NAME/
Examples:

03_PRIME_ERA/

substrate/

structure/

ops/

Deepen via Directory Topology.

4.2 Directory Identity
A directory name must reflect:

structural class

purpose

stability

Directories may not encode implementation details.

5. Surface Naming Conventions
5.1 Constitutional Surfaces
Must be named after the governance concept they define.

Examples:

razor-principles.md

lifecycle-rules.md

naming-governance.md

5.2 Structural Surfaces
Must describe the structural role.

Examples:

substrate-spec.md

topology-map.md

directory-topology.md

5.3 Public Surfaces
Must be clear, declarative, and non‑technical.

Examples:

public-announcement.md

one-page-explainer.md

public-faq.md

5.4 Provenance Surfaces
Must encode historical function.

Examples:

provenance-timeline.md

chain-of-custody-note.md

authorship-declaration.md

6. Naming Restrictions
The following are forbidden:

implicit names

silent renames

semantic drift

ambiguous abbreviations

overloaded terms

names implying behavior (e.g., “manager”, “engine”)

names encoding implementation details

names that collapse multiple concepts

Violations must be resolved via Razor Principles.

7. Naming Patterns by Class
7.1 Index Surfaces
Code
*-index.md
Examples:

prime-corpus-index.md

structure-index.md

7.2 Maps and Schemas
Code
*-map.md
*-schema.md
Examples:

topology-map.md

naming-schema.md

7.3 Notes and Declarations
Code
*-note.md
*-declaration.md
Examples:

ignition-notes.md

authorship-declaration.md

7.4 Rules and Principles
Code
*-rules.md
*-principles.md
Examples:

lifecycle-rules.md

razor-principles.md

8. Renaming Protocol
Renaming requires:

Declaration

Scope Binding

Razor Stabilization

Propagation

Renaming is a constitutional event and must be logged in the Provenance Timeline.

Deepen via DSR‑1.

9. Status
Surface: Naming Conventions

Version: v0.1

Lifecycle: Declared

Next Step: Stabilization under DSR‑1
