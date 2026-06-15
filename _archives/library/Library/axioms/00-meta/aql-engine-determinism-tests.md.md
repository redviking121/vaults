# **AQL Engine Determinism Tests — v1.0**

**Namespace:** `AQL‑DT-*` **Status:** Authoritative **Owner:** Red Horne **Scope:** Deterministic behavior validation for AQL Engine **Purpose:** Ensure that identical inputs always produce identical outputs, with no nondeterministic ordering, no environment leakage, and no implicit coercion.

## **AQL‑DT‑01 — Deterministic Ordering Tests**

These tests validate that the engine’s output ordering is stable, canonical, and invariant across runs.

- **DT‑01.1 — Stable Object Ordering** Input: Query returning multiple objects. Expectation: Output sorted lexicographically by object ID, no variation.
    
- **DT‑01.2 — Stable Link Ordering** Input: Query returning link sets. Expectation: Links appear in canonical order (source → target, lexicographic).
    
- **DT‑01.3 — Stable Predicate Resolution Ordering** Input: Combined predicates with multiple match candidates. Expectation: Predicate evaluation order does not affect final output.
    

## **AQL‑DT‑02 — Environment Isolation Tests**

These tests ensure the engine never leaks or depends on external state.

- **DT‑02.1 — No Clock Access** Engine must not use timestamps or runtime clocks.
    
- **DT‑02.2 — No Randomness** Any use of randomness, seeds, or entropy sources is forbidden.
    
- **DT‑02.3 — No External I/O** Engine must not read from filesystem, network, or environment variables.
    
- **DT‑02.4 — No Execution Context Drift** Repeated runs in different environments must produce identical results.
    

## **AQL‑DT‑03 — Null & Empty Behavior Determinism**

These tests validate that nulls, empties, and missing fields behave identically across runs.

- **DT‑03.1 — Null Field Equality** Null fields must compare deterministically (`null == null` → true).
    
- **DT‑03.2 — Empty Set Stability** Empty result sets must serialize identically.
    
- **DT‑03.3 — Missing Field Handling** Missing fields must behave identically to null unless explicitly disallowed.
    

## **AQL‑DT‑04 — Predicate Determinism Tests**

Ensures all predicate classes behave deterministically.

- **DT‑04.1 — Comparison Predicate Stability** `=`, `!=`, `<`, `>` must produce identical results across runs.
    
- **DT‑04.2 — Logical Predicate Stability** `AND`, `OR`, `NOT` must not reorder or short‑circuit nondeterministically.
    
- **DT‑04.3 — Structural Predicate Stability** Link, dependency, and integrity predicates must resolve deterministically.
    

## **AQL‑DT‑05 — Combined Query Determinism**

Tests multi‑clause queries for deterministic behavior.

- **DT‑05.1 — SELECT + WHERE Stability** Combined clauses must not introduce nondeterministic ordering.
    
- **DT‑05.2 — Multi‑Predicate Resolution** Predicate evaluation order must not affect output.
    
- **DT‑05.3 — Multi‑Object Graph Traversal** Traversal must follow canonical ordering rules.
    

## **AQL‑DT‑06 — Graph Topology Determinism**

Ensures graph traversal and structural resolution are deterministic.

- **DT‑06.1 — Cyclic Graph Handling** Cycles must be resolved deterministically with no infinite loops.
    
- **DT‑06.2 — Multi‑Parent Resolution** Multiple inbound links must be processed in canonical order.
    
- **DT‑06.3 — Deep Traversal Stability** Depth‑first or breadth‑first traversal must be fixed and invariant.
    

## **AQL‑DT‑07 — Serialization Determinism**

Ensures output serialization is stable.

- **DT‑07.1 — Canonical JSON Serialization** Keys sorted lexicographically; no runtime ordering drift.
    
- **DT‑07.2 — Canonical Set Serialization** Sets must serialize in deterministic order.
    
- **DT‑07.3 — Canonical Null/Empty Serialization** Nulls and empties must serialize identically across runs.
    

## **AQL‑DT‑08 — Runner Integration Determinism**

Ensures the AQL Test Runner produces identical reports.

- **DT‑08.1 — Report Stability** Identical inputs → identical reports, byte‑for‑byte.
    
- **DT‑08.2 — Error Ordering Stability** Errors must appear in canonical order.
    
- **DT‑08.3 — Comparison Engine Stability** Expected vs actual diffing must be deterministic.
    

## **AQL‑DT‑09 — Edge‑Case Determinism**

Integrates with the **AQL Edge‑Case Corpus**.

- **DT‑09.1 — Malformed Object Stability** Malformed objects must produce identical error outputs.
    
- **DT‑09.2 — Contradictory Predicate Stability** Contradictions must resolve identically.
    
- **DT‑09.3 — Degenerate Graph Stability** Empty, null, or single‑node graphs must behave identically.
    

## **AQL‑DT‑10 — Full Corpus Determinism Sweep**

The final, authoritative test.

- Execute **entire AQL Test Corpus**
    
- Compare against **Expected Output Matrix**
    
- Validate byte‑for‑byte identity
    
- Any deviation → engine is nondeterministic