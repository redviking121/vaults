---
title: Red — you’re good. We’re still in the right place.
timestamp: 2026-05-14T14:04:00
uid: 4860d171
source: 202605141404.md
tags: [status:actionable, struct:future, struct:list]
---
Red — you’re good. We’re still in the right place.  
You said:

> **“We were starting normalize in ingestiond.py.”**

So let’s reopen that surface cleanly and **drop in the Normalize‑stage skeleton** exactly where it belongs in your existing ingestiond.py scaffold.

Below is the **operator‑grade Normalize stage** — minimal, deterministic, and ready to wire into your pipeline.

---

# 🜁 **Normalize Stage — Clean Skeleton**

This version assumes:

- Input: raw file contents (string or bytes)
- Output: a normalized Python dict
- All structural failures raise `NormalizeError`
- Journal + DLQ hooks already exist

```python
# --------------------------------------------------------------------
# Normalize Stage
# --------------------------------------------------------------------

class NormalizeError(Exception):
    pass

def stage_normalize(raw_content, file_path):
    """
    Normalize the raw content into a canonical Python dict.
    This stage should:
      - validate structure
      - strip BOM / whitespace
      - ensure UTF-8 decode
      - enforce required keys
      - return a normalized dict
    """

    # 1. Decode bytes → str
    if isinstance(raw_content, bytes):
        try:
            raw_content = raw_content.decode("utf-8", errors="strict")
        except Exception as e:
            raise NormalizeError(f"UTF-8 decode failed: {e}")

    # 2. Strip BOM + whitespace
    raw_content = raw_content.lstrip("\ufeff").strip()

    # 3. Parse JSON (or YAML later)
    try:
        data = json.loads(raw_content)
    except Exception as e:
        raise NormalizeError(f"JSON parse failed: {e}")

    # 4. Validate required structure
    if not isinstance(data, dict):
        raise NormalizeError("Top-level structure must be an object/dict")

    required = ["id", "type", "payload"]
    missing = [k for k in required if k not in data]
    if missing:
        raise NormalizeError(f"Missing required keys: {missing}")

    # 5. Canonicalize fields
    data["id"] = str(data["id"]).strip()
    data["type"] = str(data["type"]).lower().strip()

    # 6. Return normalized dict
    return data
```

---

# 🜁 **How this fits into your existing ingestiond.py**

Inside your `run_file_with_retries()` pipeline, you already have:

```python
raw = stage_ingest(file_path)
norm = stage_normalize(raw, file_path)
ext  = stage_extract(norm, file_path)
emit = stage_emit(ext, file_path)
```

This Normalize stage slots directly into that sequence.

---

# 🜁 **What Normalize _is_ and _is not_**

Normalize **is**:

- structural validation
- canonicalization
- decoding
- schema enforcement
- “make this safe for downstream stages”

Normalize **is not**:

- extraction
- routing
- classification
- emitting
- journaling

Those belong to the other stages.

---

# 🜁 **If you want next steps**

You can open any of these surfaces:

- **Implement stage_extract** — turn normalized dict → semantic record
- **Implement stage_emit** — write final artifact to vault
- **Harden normalize** — schema versioning, strict modes, etc.
- **Show full ingestiond.py with normalize wired in**

Which one do you want to open next, Red.