# **AQL Test Corpus — v1.0**

**Namespace:** `AQL-TC-*` **Status:** Authoritative **Purpose:** Provide a complete structural testbed for validating AQL query correctness, determinism, and engine behavior.

# **AQL‑TC‑01 — Test Objects**

AQL operates over a structural object graph. The corpus defines a minimal but complete set of objects covering:

- AX‑series (axioms)
    
- LN‑series (linter rules)
    
- Library objects (notes, files, nodes)
    
- Cross‑links
    
- Dependencies
    
- Integrity states
    

All objects are **structural only** — no semantics.

## **AQL‑TC‑01.1 — Objects**

Code

```
OBJ-001:
  id: AX-01
  type: axiom
  layer: axioms
  status: active
  tags: [core, substrate]
  depends_on: []
  links: [LN-01]
  integrity: valid

OBJ-002:
  id: AX-02
  type: axiom
  layer: axioms
  status: active
  tags: [governance]
  depends_on: [AX-01]
  links: []
  integrity: valid

OBJ-003:
  id: LN-01
  type: rule
  layer: linter
  status: active
  tags: [pattern]
  depends_on: []
  links: []
  integrity: valid

OBJ-004:
  id: LN-02
  type: rule
  layer: linter
  status: deprecated
  tags: [pattern]
  depends_on: []
  links: []
  integrity: invalid

OBJ-005:
  id: LIB-01
  type: note
  layer: library
  status: draft
  tags: [alpha, test]
  depends_on: [AX-01]
  links: [LIB-02]
  integrity: valid

OBJ-006:
  id: LIB-02
  type: note
  layer: library
  status: stable
  tags: [beta]
  depends_on: []
  links: []
  integrity: valid
```

This set is sufficient to test:

- cross‑layer queries
    
- dependency traversal
    
- link traversal
    
- tag selectors
    
- integrity filters
    
- status filters
    
- type filters
    

# **AQL‑TC‑02 — Query Classes**

Each query includes:

- **Query** — the AQL input
    
- **Expected Output** — deterministic result set
    
- **Purpose** — what engine behavior it validates
    

## **AQL‑TC‑02.1 — Basic Selection**

### **TC‑02.1‑A — Select all objects**

Code

```
SELECT id FROM objects
```

**Expected:** `[AX-01, AX-02, LN-01, LN-02, LIB-01, LIB-02]` **Purpose:** baseline enumeration.

### **TC‑02.1‑B — Select all axioms**

Code

```
SELECT id FROM objects WHERE type = "axiom"
```

**Expected:** `[AX-01, AX-02]` **Purpose:** type filtering.

## **AQL‑TC‑02.2 — Tag Filtering**

### **TC‑02.2‑A — Objects tagged 'pattern'**

Code

```
SELECT id FROM objects WHERE tags CONTAINS "pattern"
```

**Expected:** `[LN-01, LN-02]` **Purpose:** tag membership.

### **TC‑02.2‑B — Objects tagged 'core'**

Code

```
SELECT id FROM objects WHERE tags CONTAINS "core"
```

**Expected:** `[AX-01]` **Purpose:** single‑tag match.

## **AQL‑TC‑02.3 — Status Filtering**

### **TC‑02.3‑A — Active objects**

Code

```
SELECT id FROM objects WHERE status = "active"
```

**Expected:** `[AX-01, AX-02, LN-01]` **Purpose:** status equality.

### **TC‑02.3‑B — Deprecated objects**

Code

```
SELECT id FROM objects WHERE status = "deprecated"
```

**Expected:** `[LN-02]` **Purpose:** deprecated detection.

## **AQL‑TC‑02.4 — Integrity Filtering**

### **TC‑02.4‑A — Invalid objects**

Code

```
SELECT id FROM objects WHERE integrity = "invalid"
```

**Expected:** `[LN-02]` **Purpose:** integrity enforcement.

## **AQL‑TC‑02.5 — Dependency Queries**

### **TC‑02.5‑A — Objects depending on AX‑01**

Code

```
SELECT id FROM objects WHERE depends_on CONTAINS "AX-01"
```

**Expected:** `[AX-02, LIB-01]` **Purpose:** dependency traversal.

### **TC‑02.5‑B — Objects with no dependencies**

Code

```
SELECT id FROM objects WHERE depends_on EMPTY
```

**Expected:** `[AX-01, LN-01, LN-02, LIB-02]` **Purpose:** empty‑set matching.

## **AQL‑TC‑02.6 — Link Queries**

### **TC‑02.6‑A — Objects linking to LIB‑02**

Code

```
SELECT id FROM objects WHERE links CONTAINS "LIB-02"
```

**Expected:** `[LIB-01]` **Purpose:** link traversal.

### **TC‑02.6‑B — Objects with no links**

Code

```
SELECT id FROM objects WHERE links EMPTY
```

**Expected:** `[AX-02, LN-01, LN-02, LIB-02]` **Purpose:** empty link sets.

## **AQL‑TC‑02.7 — Layer Queries**

### **TC‑02.7‑A — All library objects**

Code

```
SELECT id FROM objects WHERE layer = "library"
```

**Expected:** `[LIB-01, LIB-02]` **Purpose:** layer filtering.

## **AQL‑TC‑02.8 — Compound Predicates**

### **TC‑02.8‑A — Active + valid**

Code

```
SELECT id FROM objects WHERE status = "active" AND integrity = "valid"
```

**Expected:** `[AX-01, AX-02, LN-01]` **Purpose:** logical AND.

### **TC‑02.8‑B — Library OR deprecated**

Code

```
SELECT id FROM objects WHERE layer = "library" OR status = "deprecated"
```

**Expected:** `[LN-02, LIB-01, LIB-02]` **Purpose:** logical OR.

## **AQL‑TC‑02.9 — Negative Predicates**

### **TC‑02.9‑A — Objects NOT in library**

Code

```
SELECT id FROM objects WHERE layer != "library"
```

**Expected:** `[AX-01, AX-02, LN-01, LN-02]` **Purpose:** inequality.

## **AQL‑TC‑02.10 — Cross‑Selector Queries**

### **TC‑02.10‑A — Axioms linking to rules**

Code

```
SELECT id FROM objects WHERE type = "axiom" AND links CONTAINS "LN-01"
```

**Expected:** `[AX-01]` **Purpose:** cross‑type relation.

# **AQL‑TC‑03 — Engine Behavior Tests**

These validate engine invariants.

## **TC‑03.1 — Deterministic Ordering**

All result sets must be **stable‑sorted by id** unless ORDER BY is specified.

## **TC‑03.2 — No Inference**

Queries must not infer missing fields or relationships.

## **TC‑03.3 — No Mutation**

Queries must not modify objects.

## **TC‑03.4 — Empty Result Handling**

Code

```
SELECT id FROM objects WHERE tags CONTAINS "nonexistent"
```

**Expected:** `[]`

# **AQL‑TC‑04 — Stress Queries**

### **TC‑04.1 — Multi‑predicate chain**

Code

```
SELECT id FROM objects
WHERE type = "note"
  AND integrity = "valid"
  AND tags CONTAINS "alpha"
  AND links CONTAINS "LIB-02"
```

**Expected:** `[LIB-01]`

### **TC‑04.2 — Deep negative**

Code

```
SELECT id FROM objects
WHERE type != "rule"
  AND status != "deprecated"
  AND integrity != "invalid"
```

**Expected:** `[AX-01, AX-02, LIB-01, LIB-02]`