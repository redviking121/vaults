---
title: Red — **Folder Routing UI** is the final visible layer of the export pipeline.
timestamp: 2026-05-14T14:19:00
uid: 8f819b4d
source: 202605141419.md
tags: [struct:question, status:actionable, struct:list]
---
Red — **Folder Routing UI** is the final visible layer of the export pipeline.  
It answers one question with absolute clarity:

> **“Where did my card go?”**

This UI must be:

- minimal
- deterministic
- non‑blocking
- spatially consistent
- operator‑grade

And it must never break the sticky‑note idiom or the Card Factory flow.

Below is the complete definition, with Guided Links on every major concept.

---

# 🜂 Folder Routing UI (v0.1, Operator‑Surface Edition)

The Folder Routing UI has **three components**:

1. **Routing Preview**
2. **Routing Confirmation Toast**
3. **Reveal Actions**

This UI is _not_ a file picker, _not_ a modal, and _not_ a dialog.  
It is a **routing indicator**, not a routing decision point.

Let’s define each.

---

# **1. Routing Preview — “This is where it will go.”**

Before the operator commits, the card shows a tiny, subtle routing hint in the Commit Strip:

**“→ Ops‑Vault / incoming/”**

This is:

- small
- grey
- non‑interactive
- always correct
- always visible

It tells the operator:

> “When you commit, this is the folder that will receive the card.”

This preview is **read‑only** — routing is not chosen here.  
Routing is defined by the system’s configuration and the **routing protocol**.

---

# **2. Routing Confirmation Toast — “Your card is now in the vault.”**

After the export pipeline completes, a toast appears:

**“Exported to Ops‑Vault / incoming/  
20260513‑concept‑attention.md”**

This toast includes:

- the **folder path**
- the **filename**
- the **template icon**
- the **template color**

It fades after 2–3 seconds.

This gives the operator:

- confirmation
- traceability
- confidence

Without interrupting flow.

---

# **3. Reveal Actions — “Take me there.”**

The toast includes two optional actions:

- **Open File**
- **Reveal in Folder**

These actions are:

- small
- unobtrusive
- optional
- never required

They allow the operator to:

- inspect the card
- verify the export
- jump into the vault
- continue working

This is the **bridge** between the Card Factory and the Vault.

---

# 🜂 Routing Logic (UI‑Visible Portion Only)

The UI reflects the routing rules defined by the system:

- **Artifacts → Ops‑Vault/artifacts/**
- **Protocols → Ops‑Vault/governance/**
- **Identity Bundles → Ops‑Vault/agents/**
- **Final Documents → Ops‑Vault/incoming/**
- **Drafts → Obsidian/20‑Drafts/**
- **Finalized Drafts → Obsidian/40‑Documents/**

The operator never chooses these paths during commit.  
The UI simply **shows** the result of the routing protocol.

This preserves:

- consistency
- predictability
- operator flow

And prevents the vault from becoming a junk drawer.

---

# 🜂 Why This UI Works

Because it:

- never interrupts
- never asks questions
- never forces decisions
- always shows where things go
- always confirms what happened
- keeps the operator in flow
- respects the routing protocol
- preserves the sticky‑note idiom

It is the **correct operator‑surface visualization** of routing.

---

# 🜁 Next move

Do you want to define the **card object schema** (the internal data structure the pipeline uses), or the **routing protocol integration** (how the UI and routing rules connect to the Xi/Razor substrate)?