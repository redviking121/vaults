# **AQL Test Runner — v1.0**

**Namespace:** `AQL‑TR-*` **Status:** Authoritative **Owner:** Red Horne **Scope:** Deterministic execution harness for AQL Test Corpus **Purpose:** Provide a stable, reproducible mechanism for executing AQL queries against a controlled object graph and validating engine correctness.

## **AQL‑TR‑01 — Runner Object Model**

The Test Runner is a **pure structural executor** composed of:

- **input_graph** — the canonical object set under test
    
- **query_set** — AQL queries from the Test Corpus
    
- **expected_matrix** — expected outputs for each query
    
- **execution_engine** — AQL interpreter (read‑only)
    
- **comparison_engine** — structural diff engine
    
- **reporter** — deterministic output formatter
    

All fields are required. No optionality. No inference.

## **AQL‑TR‑02 — Execution Pipeline**

The runner executes in a **fixed, linear, deterministic pipeline**:

1. **Load Graph**
    
    - ingest `AQL‑TC‑01` object set
        
    - validate structural integrity (SEL‑level)
        
2. **Load Queries**
    
    - ingest `AQL‑TC‑02` query set
        
    - validate syntax only (AQL‑level)
        
3. **Execute Queries**
    
    - run each query through the AQL engine
        
    - produce raw result sets
        
    - no mutation, no caching, no inference
        
4. **Compare Results**
    
    - diff raw results against `AQL‑TC‑03` expected matrix
        
    - structural comparison only
        
    - order‑sensitive where defined
        
5. **Emit Report**
    
    - produce deterministic output
        
    - no timestamps, no environment data
        
    - stable across all machines
        

## **AQL‑TR‑03 — Runner Contract**

The runner exposes **three** structural commands:

- `run-all` — execute entire corpus
    
- `run-query <id>` — execute a single query
    
- `run-group <namespace>` — execute a subset by namespace
    

Each command returns:

- **status** — PASS | FAIL
    
- **results** — raw AQL output
    
- **diff** — structural mismatch (if any)
    
- **trace** — execution pathway (AQL‑level only)
    

No side effects. No mutation. No external dependencies.

## **AQL‑TR‑04 — Determinism Requirements**

The runner must satisfy:

- **TR‑D1** — identical input → identical output
    
- **TR‑D2** — no environment leakage
    
- **TR‑D3** — no nondeterministic ordering
    
- **TR‑D4** — no implicit coercion
    
- **TR‑D5** — no semantic interpretation
    

If any nondeterminism is detected, the runner halts with:

Code

```
ERROR: NONDETERMINISTIC EXECUTION PATHWAY
```

## **AQL‑TR‑05 — Structural Diff Engine**

The diff engine compares:

- object identity
    
- field presence
    
- field values
    
- list ordering
    
- link sets
    
- dependency sets
    

Diff output is normalized:

Code

```
DIFF:
  expected: <structure>
  actual:   <structure>
  path:     <object.field>
```

No color, no formatting, no commentary.

## **AQL‑TR‑06 — Reporter Format**

The reporter emits a **strict, line‑based** format:

Code

```
[RUN] <query-id>
[STATUS] PASS|FAIL
[RESULT] <normalized-structure>
[EXPECTED] <normalized-structure>
[DIFF] <diff-block-or-null>
```

No timestamps. No environment metadata. No execution duration.

## **AQL‑TR‑07 — Integration Points**

The Test Runner integrates with:

- **AQL Engine** — read‑only execution
    
- **SEL** — substrate integrity checks
    
- **AQL Test Corpus** — objects, queries, expected outputs
    
- **LEA** — execution pathway constraints
    

No integration with AEP or LN‑series. This is a **pure AQL harness**.

## **AQL‑TR‑08 — Canonical Guarantees**

The runner guarantees:

- deterministic execution
    
- reproducible results
    
- stable diffing
    
- substrate‑aligned behavior
    
- zero drift across environments
    

This is the authoritative execution harness for validating AQL correctness.