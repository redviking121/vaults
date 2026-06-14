---
title: Good — resisting Rococo is exactly the right instinct.
timestamp: 2026-05-14T07:29:00
uid: 31fa18f5
source: 202605140729.md
tags: [struct:question, struct:future, xi:emphasis, struct:list]
---
Good — resisting Rococo is exactly the right instinct.  
A pre‑flight drift check wants to be **spartan**, **deterministic**, and **boringly correct**.

Here’s the **operator‑grade decision table** for v0.1 — the smallest thing that actually works and won’t bite you later.

---

# **Pre‑Flight Drift Check — v0.1 Decision Table**

Think of it as a four‑signal gate:

1. **Local manifest** (hash or mtime+size)
2. **Cloud manifest** (same fields)
3. **Tombstones** (deletions)
4. **Environment sanity** (can we even trust the filesystem/network right now)

Everything flows from comparing (1) and (2), with (3) resolving ambiguity and (4) preventing foot‑guns.

---

## **1. Inputs**

- `L.hash` — hash manifest of local Library
- `C.hash` — hash manifest of cloud mirror
- `L.tomb` — local tombstone log
- `C.tomb` — cloud tombstone log
- `ENV.ok` — boolean: filesystem readable, OneDrive reachable, no partial mounts

---

## **2. Decision Table**

```
+---------------------------+---------------------------+-------------------------------+
| Condition                 | Interpretation            | Output                        |
+---------------------------+---------------------------+-------------------------------+
| !ENV.ok                   | Environment unsafe        | ABORT_ENV_UNSAFE              |
| L.hash == C.hash          | No drift                  | OK_SYNC_NOOP                  |
| L.hash != C.hash AND      | Local ahead               | OK_SYNC_FORWARD               |
|   L.tomb == C.tomb AND    | (pure additions/edits)    |                               |
|   L.hash newer            |                           |                               |
| L.hash != C.hash AND      | Cloud ahead               | OK_SYNC_BACKWARD              |
|   L.tomb == C.tomb AND    | (pure additions/edits)    |                               |
|   C.hash newer            |                           |                               |
| L.tomb != C.tomb          | Divergent deletions       | CONFLICT_HUMAN_REVIEW         |
| L.hash != C.hash AND      | Mixed drift               | CONFLICT_HUMAN_REVIEW         |
|   neither side strictly   | (edits on both sides)     |                               |
|   ahead                   |                           |                               |
+---------------------------+---------------------------+-------------------------------+
```

---

## **3. Output Types (canonical)**

- `OK_SYNC_NOOP` — manifests match; nothing to do
- `OK_SYNC_FORWARD` — push local → cloud
- `OK_SYNC_BACKWARD` — pull cloud → local
- `CONFLICT_HUMAN_REVIEW` — both sides changed or tombstones diverged
- `ABORT_ENV_UNSAFE` — network/mount/permissions not trustworthy

---

## **4. Failure Modes**

- **Manifest unreadable** → treat as `ABORT_ENV_UNSAFE`
- **Tombstone missing** → treat as divergence → `CONFLICT_HUMAN_REVIEW`
- **Partial cloud read** → `ABORT_ENV_UNSAFE`
- **Clock skew** → ignore timestamps; rely on hash ordering only

---

## **5. Minimal State Diagram (text form)**

```
START
  |
  v
Check ENV.ok ---- no ----> ABORT_ENV_UNSAFE
  |
 yes
  v
Compare L.hash == C.hash ---- yes ----> OK_SYNC_NOOP
  |
 no
  v
Check tombstones equal? ---- no ----> CONFLICT_HUMAN_REVIEW
  |
 yes
  v
Is L.hash newer? ---- yes ----> OK_SYNC_FORWARD
  |
 no
  v
Is C.hash newer? ---- yes ----> OK_SYNC_BACKWARD
  |
 no
  v
CONFLICT_HUMAN_REVIEW
```

---

## **Why this works**

- **Hash manifests** give you deterministic drift detection without over‑engineering.
- **Tombstones** prevent the classic “file deleted on one side, edited on the other” silent corruption.
- **ENV.ok** prevents sync during partial mounts, stale OneDrive states, or network hiccups.
- **Typed outputs** give you a clean interface for cron, manual triggers, and safe writeback later.

This is the **v0.1 doctrine** — small, sharp, and stable.

---

If you want, I can now generate:

- the **v0.2 version** with conflict classes
- the **state‑machine diagram** in a more formal operator style
- or the **integration layer** showing how cron calls this without causing drift

Which direction do you want to move next, Red.