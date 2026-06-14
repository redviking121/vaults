Xanadu Prime — Org/Repo Topology (v0.1)
1. Purpose
This surface defines the repository‑level topology for the Xanadu Prime epoch.
It establishes which repos are active, which are declared for future epochs, and how they relate to the Prime substrate.

Prime is a single‑repo epoch.
All structure flows from this fact.

2. Org‑Level View
Org Name: Xanadu-Prime

Epoch: Prime (closed)

Scope: Only repos explicitly listed here are recognized as part of the Prime substrate.

Repos fall into two classes:

Active Repos — instantiated during Prime

Declared Repos — reserved for successor epochs

3. Active Repos (Prime Epoch)
3.1 xanadu-prime
Role:  
The canonical home of all Prime‑era surfaces, including governance, substrate, public documents, and provenance.

Contents:

03_PRIME_ERA — complete Prime corpus

structure — indices, schemas, structural views

substrate — substrate definitions and axioms

ops — operator utilities and playbooks

backups — snapshot archives

tmp — ephemeral workspace

Class: Constitutional + Structural + Public
Status: Active and stabilized as the root repo of the Prime epoch.

There is exactly one active repo in Prime.

4. Declared Future Repos
These repos are declared in topology but not instantiated during Prime.
They belong to the structural horizon of successor epochs.

4.1 substrate-core
Intended Role:  
Host the generalized substrate specification and reusable ontological definitions.

Relationship to Prime:  
Prime’s substrate definitions would eventually be refactored or mirrored here.

Status: Declared only.

4.2 ops-toolkit
Intended Role:  
Centralize operator tools, scanners, and automation for multi‑epoch operations.

Relationship to Prime:  
Prime’s ops/ directory is the seed for this future repo.

Status: Declared only.

4.3 demonstration-layer
Intended Role:  
Host public‑facing render logic, demo sites, and external presentation layers.

Relationship to Prime:  
Prime’s public surfaces originate in xanadu-prime and could be rendered from this repo in a successor epoch.

Status: Declared only.

5. Invariants
Single Root Repo: Only xanadu-prime is active during Prime.

No Shadow Repos: No undocumented repos may claim Prime lineage.

Declared ≠ Active: Declared repos must not be instantiated without a successor‑epoch event.

Lineage Lock: Any future repo must declare explicit derivation from this topology.

6. Status
Surface: Org/Repo Topology for Xanadu Prime

Version: v0.1

Lifecycle: Declared (pending stabilization under DSR‑1)
