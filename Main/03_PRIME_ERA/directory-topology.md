Xanadu Prime — Directory Topology (v1.0)
1. Purpose
The Directory Topology defines the canonical directory structure of the xanadu-prime repo.
It establishes:

which directories exist

what each directory is for

what class of surface it contains

what invariants govern it

how it participates in the Prime substrate

This topology is binding.
No directory may be added, renamed, or repurposed without a DSR‑1 event.

2. Canonical Directory Tree
Code
xanadu-prime/
├── 03_PRIME_ERA/
├── substrate/
├── structure/
├── ops/
├── backups/
└── tmp/
Each directory is a governed region with strict boundaries.

3. Directory Definitions
3.1 03_PRIME_ERA
Class: Constitutional + Public + Provenance
Purpose:  
The complete Prime‑era corpus.
Contains all stabilized surfaces created during the Prime epoch.

Contents include:

public announcement

one‑page explainer

technical overview

corpus index

provenance timeline

chain of custody

governance surfaces

substrate surfaces

Invariants:

No file may be moved out once stabilized.

No retroactive renaming.

Only Prime‑era surfaces may live here.

3.2 substrate
Class: Structural
Purpose:  
Holds the substrate definitions, including axioms, lifecycle rules, and structural specifications.

Contents include:

substrate axioms

substrate lifecycle

ignition notes

substrate spec

Invariants:

Defines the ontological core of the system.

No public surfaces may appear here.

All contents must be structural, not narrative.

3.3 structure
Class: Structural
Purpose:  
Contains indices, schemas, and structural views of the corpus.

Contents include:

corpus index views

schema definitions

structural maps

cross‑surface indices

Invariants:

Must not contain original content.

Only derived or structural views are allowed.

No provenance or public surfaces.

3.4 ops
Class: Operational
Purpose:  
Holds operator utilities, scripts, and playbooks.

Contents include:

operator scripts

workflow playbooks

scanners

maintenance utilities

Invariants:

Must not contain Prime‑era narrative surfaces.

Scripts must be idempotent and non‑destructive.

This directory is the seed for the future ops-toolkit repo.

3.5 backups
Class: Provenance
Purpose:  
Stores snapshot archives of stabilized surfaces.

Contents include:

timestamped snapshots

recovery bundles

integrity checks

Invariants:

Backups must be immutable.

No editing of archived files.

Only additive operations allowed.

3.6 tmp
Class: Ephemeral
Purpose:  
Temporary workspace for drafts, experiments, and operator scratch files.

Invariants:

No file in tmp/ is canonical.

Nothing in tmp/ participates in lineage.

Contents may be deleted at any time.

No stabilized surface may ever live here.

4. Directory‑Level Invariants
These invariants apply across the entire directory topology:

No cross‑region drift — files cannot migrate between directories.

No implicit directories — all directories must be declared in this topology.

No ungoverned surfaces — every file must belong to a governed class.

No retroactive movement — once stabilized, a file’s location is permanent.

Directory names are immutable — renaming requires a DSR‑1 event.

5. Status
Directory Topology: v1.0

Lifecycle: Declared → Stabilized

Binding: Yes (Prime‑epoch invariant)
