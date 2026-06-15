
# **AQL Edge‑Case Corpus — v1.0**

**Namespace:** `AQL‑EC-*` **Status:** Authoritative **Purpose:** Validate AQL engine correctness under boundary, malformed, null, contradictory, and degenerate structural conditions. **Scope:** Objects, relations, and queries that intentionally violate or stress substrate invariants.

# **AQL‑EC‑01 — Edge‑Case Objects**

These objects exist solely to test engine behavior under extreme structural conditions.

## **EC‑OBJ‑01 — Null‑Only Object**

Code

```
id: EC-OBJ-01
type: null
layer: null
status: null
tags: null
depends_on: null
links: null
integrity: null
```

## **EC‑OBJ‑02 — Empty Arrays**

Code

```
id: EC-OBJ-02
type: AX
layer: 0
status: active
tags: []
depends_on: []
links: []
integrity: []
```

## **EC‑OBJ‑03 — Mixed Null + Empty**

Code

```
id: EC-OBJ-03
type: LN
layer: null
status: active
tags: []
depends_on: null
links: []
integrity: null
```

## **EC‑OBJ‑04 — Circular Dependency (Self)**

Code

```
id: EC-OBJ-04
type: AX
layer: 1
status: active
depends_on: ["EC-OBJ-04"]
```

## **EC‑OBJ‑05 — Circular Dependency (Pair)**

Code

```
id: EC-OBJ-05
type: AX
layer: 1
status: active
depends_on: ["EC-OBJ-06"]
```

Code

```
id: EC-OBJ-06
type: AX
layer: 1
status: active
depends_on: ["EC-OBJ-05"]
```

## **EC‑OBJ‑07 — Broken Link Target**

Code

```
id: EC-OBJ-07
type: LN
layer: 2
status: active
links: ["NONEXISTENT-ID"]
```

## **EC‑OBJ‑08 — Duplicate IDs (Illegal)**

Two objects with the same ID:

Code

```
id: EC-OBJ-08
type: AX
layer: 0
```

Code

```
id: EC-OBJ-08
type: LN
layer: 1
```

## **EC‑OBJ‑09 — Invalid Layer (Negative)**

Code

```
id: EC-OBJ-09
type: AX
layer: -1
```

## **EC‑OBJ‑10 — Invalid Layer (Non‑Integer)**

Code

```
id: EC-OBJ-10
type: AX
layer: "two"
```

## **EC‑OBJ‑11 — Invalid Type**

Code

```
id: EC-OBJ-11
type: "NOT-A-TYPE"
layer: 0
```

## **EC‑OBJ‑12 — Overspecified Integrity**

Code

```
id: EC-OBJ-12
type: AX
layer: 1
integrity: ["unknown-flag", "duplicate", "unknown-flag"]
```

## **EC‑OBJ‑13 — Deep Dependency Chain (10 levels)**

Code

```
EC-OBJ-13 → EC-OBJ-14 → … → EC-OBJ-22
```

Each object:

Code

```
id: EC-OBJ-13..22
type: AX
layer: 1
depends_on: ["next-id"]
```

## **EC‑OBJ‑14 — Dependency Fan‑Out (100 deps)**

Code

```
id: EC-OBJ-23
type: AX
layer: 1
depends_on: ["OBJ-001", "OBJ-002", … "OBJ-100"]
```

## **EC‑OBJ‑15 — Dependency Fan‑In (100 inbound)**

100 objects depend on this one:

Code

```
id: EC-OBJ-24
type: AX
layer: 1
```

## **EC‑OBJ‑16 — Mixed Valid + Invalid Fields**

Code

```
id: EC-OBJ-25
type: AX
layer: 1
status: "ghost"
tags: ["valid", null, 42]
depends_on: ["EC-OBJ-99", null]
links: ["EC-OBJ-07", 123]
```

# **AQL‑EC‑02 — Edge‑Case Queries**

These queries test the engine’s ability to handle nulls, malformed structures, contradictions, and degenerate states.

## **EC‑Q‑01 — Select All Null Fields**

Code

```
SELECT id
FROM objects
WHERE type = null AND layer = null AND status = null
```

## **EC‑Q‑02 — Empty Arrays Should Not Match Null**

Code

```
SELECT id
FROM objects
WHERE tags = null
```

## **EC‑Q‑03 — Detect Self‑Circular Dependency**

Code

```
SELECT id
FROM objects
WHERE depends_on CONTAINS id
```

## **EC‑Q‑04 — Detect Mutual Circular Dependency**

Code

```
SELECT id
FROM objects
WHERE depends_on OVERLAPS links OR depends_on OVERLAPS depends_on
```

## **EC‑Q‑05 — Broken Link Target**

Code

```
SELECT id
FROM objects
WHERE links CONTAINS "NONEXISTENT-ID"
```

## **EC‑Q‑06 — Duplicate ID Detection**

Code

```
SELECT id
FROM objects
GROUP BY id
HAVING COUNT(id) > 1
```

## **EC‑Q‑07 — Invalid Layer (Negative)**

Code

```
SELECT id
FROM objects
WHERE layer < 0
```

## **EC‑Q‑08 — Invalid Layer (Non‑Integer)**

Code

```
SELECT id
FROM objects
WHERE layer NOT IN INTEGER
```

## **EC‑Q‑09 — Invalid Type**

Code

```
SELECT id
FROM objects
WHERE type NOT IN ["AX","LN","OBJ"]
```

## **EC‑Q‑10 — Overspecified Integrity Flags**

Code

```
SELECT id
FROM objects
WHERE integrity CONTAINS "unknown-flag"
```

## **EC‑Q‑11 — Deep Dependency Chain Traversal**

Code

```
SELECT id
FROM objects
WHERE depends_on* DEPTH > 5
```

## **EC‑Q‑12 — Dependency Fan‑Out Stress**

Code

```
SELECT id
FROM objects
WHERE SIZE(depends_on) > 50
```

## **EC‑Q‑13 — Dependency Fan‑In Stress**

Code

```
SELECT id
FROM objects
WHERE inbound_dependencies > 50
```

## **EC‑Q‑14 — Mixed Valid + Invalid Field Types**

Code

```
SELECT id
FROM objects
WHERE tags CONTAINS null OR links CONTAINS 123
```

# **AQL‑EC‑03 — Expected Output Matrix (Edge‑Case Subset)**

Only the deltas from the main EOM.

- **EC‑Q‑01 →** `EC-OBJ-01`
    
- **EC‑Q‑02 →** _no matches_
    
- **EC‑Q‑03 →** `EC-OBJ-04`
    
- **EC‑Q‑04 →** `EC-OBJ-05`, `EC-OBJ-06`
    
- **EC‑Q‑05 →** `EC-OBJ-07`
    
- **EC‑Q‑06 →** `EC-OBJ-08`
    
- **EC‑Q‑07 →** `EC-OBJ-09`
    
- **EC‑Q‑08 →** `EC-OBJ-10`
    
- **EC‑Q‑09 →** `EC-OBJ-11`
    
- **EC‑Q‑10 →** `EC-OBJ-12`
    
- **EC‑Q‑11 →** `EC-OBJ-13..22`
    
- **EC‑Q‑12 →** `EC-OBJ-23`
    
- **EC‑Q‑13 →** `EC-OBJ-24`
    
- **EC‑Q‑14 →** `EC-OBJ-25`
- 