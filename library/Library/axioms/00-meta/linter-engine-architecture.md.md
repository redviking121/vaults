# **Linter Engine Architecture (LEA‑C1.0)**

**Namespace:** `LEA-*` **Status:** Canonical **Owner:** Red Horne **Scope:** Internal architecture of the linter engine **Purpose:** Define the structural components, data flows, and execution pathways that implement AQL, AEP, and LN‑series enforcement.

## **LEA‑01 — Engine Overview**

The linter engine consists of four primary subsystems:

1. **Input Layer** — receives objects, snapshots, and operator commands
    
2. **Query Layer (AQL Engine)** — structural inspection
    
3. **Enforcement Layer (AEP Engine)** — violation detection + escalation
    
4. **Output Layer** — reports, diffs, and enforcement artifacts
    

All subsystems operate on **immutable snapshots**.

## **LEA‑02 — Data Model**

### LEA‑02.1 — Core Entities

- **Object** — axiom, rule, note, folder, link
    
- **Snapshot** — immutable state of the Library
    
- **Violation** — structural mismatch between object and LN rule
    
- **Action** — AEP‑defined enforcement step
    
- **Report** — structured output of engine execution
    

### LEA‑02.2 — Structural Guarantees

- No mutation during evaluation
    
- Deterministic ordering
    
- Stable identifiers
    
- Referential integrity enforced at load time
    

## **LEA‑03 — Input Layer**

### LEA‑03.1 — Inputs Accepted

- **AQL queries**
    
- **AEP actions**
    
- **Object sets**
    
- **Full snapshots**
    
- **Operator commands** (via CLI contract)
    

### LEA‑03.2 — Pre‑Processing

- Validate object schema
    
- Normalize identifiers
    
- Construct dependency graph
    
- Freeze snapshot
    

## **LEA‑04 — Query Layer (AQL Engine)**

### LEA‑04.1 — Responsibilities

- Execute AQL queries
    
- Traverse structural relations
    
- Produce deterministic result sets
    
- Provide data to AEP Engine
    

### LEA‑04.2 — Execution Model

- Depth‑first structural traversal
    
- Field‑level filtering
    
- Relation‑level filtering
    
- Deterministic ordering of results
    

### LEA‑04.3 — Outputs

- Object sets
    
- Field/value pairs
    
- Structural diffs
    
- Query metadata
    

## **LEA‑05 — Rule Evaluation Layer**

### LEA‑05.1 — LN Rule Loader

- Load LN‑series catalog
    
- Validate rule schema
    
- Construct rule index by:
    
    - type
        
    - field
        
    - relation
        
    - severity
        

### LEA‑05.2 — Rule Application Model

For each object:

1. Identify applicable LN rules
    
2. Execute rule patterns
    
3. Emit violations (if any)
    

### LEA‑05.3 — Violation Object

Fields:

- **id**
    
- **rule_id**
    
- **object_id**
    
- **location** (field or relation)
    
- **expected_pattern**
    
- **observed_pattern**
    
- **severity**
    

## **LEA‑06 — Enforcement Layer (AEP Engine)**

### LEA‑06.1 — Responsibilities

- Receive violations
    
- Apply AEP escalation logic
    
- Generate enforcement actions
    
- Maintain enforcement state machine
    

### LEA‑06.2 — Enforcement State Machine

States:

- **clean** — no violations
    
- **violated** — violations detected
    
- **pending** — actions queued
    
- **resolved** — actions applied
    
- **failed** — enforcement could not complete
    

Transitions are deterministic and defined in AEP‑series.

### LEA‑06.3 — Action Types

- **notify**
    
- **block**
    
- **repair**
    
- **escalate**
    
- **halt**
    

Actions are non‑semantic and structural only.

## **LEA‑07 — Output Layer**

### LEA‑07.1 — Output Types

- **Violation reports**
    
- **Enforcement logs**
    
- **Structural diffs**
    
- **Query results**
    
- **Engine metadata**
    

### LEA‑07.2 — Output Guarantees

- Deterministic ordering
    
- Stable formatting
    
- No semantic interpretation
    
- Fully machine‑readable
    

## **LEA‑08 — Execution Pipeline**

### LEA‑08.1 — Pipeline Stages

1. **Load snapshot**
    
2. **Normalize + freeze**
    
3. **Run AQL queries**
    
4. **Apply LN rules**
    
5. **Emit violations**
    
6. **Run AEP enforcement**
    
7. **Generate outputs**
    

### LEA‑08.2 — Determinism Guarantees

- Same snapshot → same outputs
    
- Same rule catalog → same violations
    
- Same AEP config → same enforcement actions
    

## **LEA‑09 — Extensibility Model**

### LEA‑09.1 — Allowed Extensions

- New LN rules
    
- New AQL operators
    
- New AEP actions
    
- New object types (with schema)
    

### LEA‑09.2 — Forbidden Extensions

- Semantic interpretation
    
- Runtime mutation
    
- Non‑deterministic traversal
    
- Context‑dependent rule evaluation
    

## **LEA‑10 — Engine Invariants**

- **No semantics**
    
- **No interpretation**
    
- **No mutation**
    
- **Deterministic execution**
    
- **Stable identifiers**
    
- **Structural purity**