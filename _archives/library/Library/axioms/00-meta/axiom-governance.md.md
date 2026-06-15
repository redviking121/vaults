# Axiom Governance
**Location:** /axioms/00-meta/axiom-governance.md  
**Purpose:** Define how axioms are created, modified, deprecated, and revoked.

## 1. Creation
A new axiom must:
- express a stable, reusable truth  
- be domain‑independent  
- be atomic  
- be testable by the linter  
- be referenced by at least one real document or protocol

## 2. Modification
Axioms may only be modified when:
- the change increases clarity without altering meaning, or  
- the original axiom is found to be structurally unsound.

All modifications must:
- preserve the axiom ID  
- be logged in the axiom changelog  
- trigger a linter re‑evaluation

## 3. Deprecation
An axiom is deprecated when:
- it is superseded by a more general axiom  
- it is no longer structurally valid  
- it contradicts a higher‑order invariant

Deprecated axioms remain in the catalog but are marked `DEPRECATED`.

## 4. Revocation
Revocation is rare and requires:
- explicit operator decision  
- migration plan for all dependent documents  
- linter enforcement to prevent future use

## 5. Versioning
The Axiom System follows semantic versioning:
- MAJOR — structural changes  
- MINOR — new axioms  
- PATCH — clarifications or metadata updates
