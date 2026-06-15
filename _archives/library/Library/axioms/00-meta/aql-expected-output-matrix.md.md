# **AQL Expected Output Matrix — v1.0 (Tabular)**

**Namespace:** `AQL‑EOM-*` **Status:** Authoritative **Purpose:** Provide the canonical expected outputs for every query in the AQL Test Corpus.

Below is the **full matrix**, aligned to the test corpus object IDs:

- **AX‑series** (axioms)
    
- **LN‑series** (link rules)
    
- **OBJ‑series** (generic structural objects)
    

All tables are **pure**, **deterministic**, **Obsidian‑safe**, and **substrate‑aligned**.

# **AQL‑EOM‑01 — Basic Selection Queries**

Code

```
| Query ID | Query Description                     | Expected Output IDs      |
|----------|----------------------------------------|---------------------------|
| Q-01     | SELECT * FROM objects                  | OBJ-01, OBJ-02, OBJ-03,  |
|          |                                        | AX-01, AX-02, LN-01      |
| Q-02     | SELECT id FROM axioms                  | AX-01, AX-02             |
| Q-03     | SELECT id FROM ln_rules                | LN-01                    |
| Q-04     | SELECT id FROM objects WHERE type=ax   | AX-01, AX-02             |
| Q-05     | SELECT id FROM objects WHERE type=ln   | LN-01                    |
```

# **AQL‑EOM‑02 — Tag Queries**

Code

```
| Query ID | Query Description                                   | Expected Output IDs |
|----------|------------------------------------------------------|----------------------|
| Q-10     | SELECT id FROM objects WHERE tags CONTAINS "core"    | AX-01               |
| Q-11     | SELECT id FROM objects WHERE tags CONTAINS "test"    | OBJ-02, LN-01       |
| Q-12     | SELECT id FROM objects WHERE tags EMPTY              | OBJ-03              |
```

# **AQL‑EOM‑03 — Link Queries**

Code

```
| Query ID | Query Description                                      | Expected Output IDs |
|----------|---------------------------------------------------------|----------------------|
| Q-20     | SELECT id FROM objects WHERE links->out CONTAINS AX-01 | OBJ-01              |
| Q-21     | SELECT id FROM objects WHERE links->in  CONTAINS OBJ-01| AX-01               |
| Q-22     | SELECT id FROM objects WHERE links->out ANY            | OBJ-01, LN-01       |
| Q-23     | SELECT id FROM objects WHERE links->in  ANY            | AX-01               |
```

# **AQL‑EOM‑04 — Dependency Queries**

Code

```
| Query ID | Query Description                                         | Expected Output IDs |
|----------|------------------------------------------------------------|----------------------|
| Q-30     | SELECT id FROM objects WHERE depends_on CONTAINS AX-02     | OBJ-02              |
| Q-31     | SELECT id FROM objects WHERE depends_on ANY                | OBJ-02, LN-01       |
| Q-32     | SELECT id FROM objects WHERE depends_on EMPTY              | AX-01, AX-02, OBJ-01|
```

# **AQL‑EOM‑05 — Integrity Queries**

Code

```
| Query ID | Query Description                                   | Expected Output IDs |
|----------|------------------------------------------------------|----------------------|
| Q-40     | SELECT id FROM objects WHERE integrity="valid"       | AX-01, OBJ-01       |
| Q-41     | SELECT id FROM objects WHERE integrity="invalid"     | LN-01               |
| Q-42     | SELECT id FROM objects WHERE integrity="unknown"     | OBJ-03              |
```

# **AQL‑EOM‑06 — Layer Queries**

Code

```
| Query ID | Query Description                                   | Expected Output IDs |
|----------|------------------------------------------------------|----------------------|
| Q-50     | SELECT id FROM objects WHERE layer=0                | AX-01               |
| Q-51     | SELECT id FROM objects WHERE layer=1                | AX-02, OBJ-01       |
| Q-52     | SELECT id FROM objects WHERE layer>=1               | AX-02, OBJ-01, LN-01|
```

# **AQL‑EOM‑07 — Combined Predicates**

Code

```
| Query ID | Query Description                                                             | Expected Output IDs |
|----------|--------------------------------------------------------------------------------|----------------------|
| Q-60     | SELECT id FROM objects WHERE type=ax AND tags CONTAINS "core"                 | AX-01               |
| Q-61     | SELECT id FROM objects WHERE type=obj AND depends_on ANY                      | OBJ-02              |
| Q-62     | SELECT id FROM objects WHERE type=ln AND integrity="invalid"                  | LN-01               |
| Q-63     | SELECT id FROM objects WHERE tags CONTAINS "test" AND depends_on ANY          | OBJ-02, LN-01       |
```

# **AQL‑EOM‑08 — Structural Edge Cases**

Code

```
| Query ID | Query Description                                         | Expected Output IDs |
|----------|------------------------------------------------------------|----------------------|
| Q-70     | SELECT id FROM objects WHERE links->out CONTAINS MISSING   | (empty)             |
| Q-71     | SELECT id FROM objects WHERE depends_on CONTAINS MISSING   | (empty)             |
| Q-72     | SELECT id FROM objects WHERE integrity="undefined"         | (empty)             |
| Q-73     | SELECT id FROM objects WHERE type="ghost"                  | (empty)             |
```

# **AQL‑EOM‑09 — Deterministic Ordering Tests**

All outputs are **sorted lexicographically** by ID.

Code

```
| Query ID | Query Description                       | Expected Output IDs      |
|----------|------------------------------------------|---------------------------|
| Q-80     | SELECT id FROM objects ORDER BY id ASC   | AX-01, AX-02, LN-01,     |
|          |                                          | OBJ-01, OBJ-02, OBJ-03   |
| Q-81     | SELECT id FROM objects ORDER BY id DESC  | OBJ-03, OBJ-02, OBJ-01,  |
|          |                                          | LN-01, AX-02, AX-01      |
```

# **AQL‑EOM‑10 — Null / Empty Field Behavior**

Code

```
| Query ID | Query Description                                   | Expected Output IDs |
|----------|------------------------------------------------------|----------------------|
| Q-90     | SELECT id FROM objects WHERE tags IS NULL            | (empty)             |
| Q-91     | SELECT id FROM objects WHERE depends_on IS NULL      | (empty)             |
| Q-92     | SELECT id FROM objects WHERE links->out IS NULL      | (empty)             |
```