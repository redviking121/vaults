---
title: Ah — perfect, Red.
timestamp: 2026-05-14T13:51:00
uid: 30753ebf
source: 202605141351.md
tags: [status:actionable, struct:future, xi:emphasis, struct:list]
---
Ah — perfect, Red.  
You’ve pasted the **exact section** where the stage stubs live.  
This means you’re _in the right place_, and now you’re ready to **replace the stub** for `stage_ingest()` with the real implementation.

Let me show you **exactly what to do next**, with zero ambiguity.

---

# 🜁 **Where you are right now**

You currently have this block:

```python
def stage_ingest(file_path):
    """Read bytes, detect type, return raw content object."""
    raise NotImplementedError("stage_ingest not implemented yet")
```

This is the placeholder.

---

# 🜁 **What you do next**

You **delete** the stub body and replace it with the real implementation.

Here is the **drop‑in replacement** — paste it _exactly_ where the stub is:

```python
def stage_ingest(file_path: Path):
    """
    INGEST STAGE:
    - Read all bytes safely
    - Verify full read
    - Detect file type (magic + extension heuristic)
    - Capture basic metadata
    - Return raw content object
    """
    import mimetypes
    import hashlib

    # -------------------------
    # Read bytes
    # -------------------------
    with open(file_path, "rb") as f:
        data = f.read()

    # Verify full read
    stat = file_path.stat()
    if len(data) != stat.st_size:
        raise RuntimeError(f"Partial read: expected {stat.st_size} bytes, got {len(data)}")

    # -------------------------
    # Detect file type
    # -------------------------
    mime, _ = mimetypes.guess_type(file_path.name)

    if mime is None:
        # crude magic-byte checks
        if data.startswith(b"%PDF"):
            mime = "application/pdf"
        elif data.startswith(b"\x50\x4B\x03\x04"):  # ZIP header → docx, etc.
            mime = "application/zip"
        else:
            mime = "application/octet-stream"

    # -------------------------
    # Compute hash
    # -------------------------
    sha256 = hashlib.sha256(data).hexdigest()

    # -------------------------
    # Build raw content object
    # -------------------------
    raw_obj = {
        "type": mime,
        "bytes": data,
        "size": stat.st_size,
        "mtime": int(stat.st_mtime),
        "original_name": file_path.name.replace(".claimed", ""),
        "claimed_name": file_path.name,
        "hash": sha256,
    }

    return raw_obj
```

That’s it.  
Your **ingest stage is now real**.

---

# 🜁 **What your file should look like now**

Right after `backoff_delay()` you should have:

```
# Stage stubs
def stage_ingest(...)   ← now implemented
def stage_normalize(...)
def stage_extract(...)
def stage_emit(...)
```

Everything else stays the same.

---

# 🜁 **Next step**

Now that `stage_ingest()` is implemented, the pipeline will:

- claim a file
- read its bytes
- detect its type
- hash it
- pass a clean raw object to Normalize

So the next logical move is:

### **Implement stage_normalize**

And you get to choose the style:

- **Minimal Normalize** (UTF‑8 decode only)
- **Progressive Normalize** (start simple, add PDF/HTML later)
- **Full Normalize** (PDF → text, HTML → MD, DOCX → MD)

Which one do you want, Red.