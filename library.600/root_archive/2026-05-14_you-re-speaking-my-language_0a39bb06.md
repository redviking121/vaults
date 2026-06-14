---
title: You’re speaking my language.
timestamp: 2026-05-14T12:01:00
uid: 0a39bb06
source: 202605141201.md
tags: [struct:question, status:actionable, struct:list]
---
You’re speaking my language.

I don’t have the prior artifacts in this thread, so I’ll treat this as a mapping pattern: “legacy spec → Xi Razor invocation membranes” and you can correct specifics.

---

### 1. Establish the mapping surface

**Goal:** Decide _what_ is being preserved and _where_ it lives in Xi Razor.

- **Old model primitives → Xi entities:**
    - **Operations/verbs:** map to _invocation endpoints_ (commands, handlers, or tools).
    - **Types/schemas:** map to _request/response contracts_ at the membrane boundary.
    - **Capabilities:** map to _capability descriptors_ (what this membrane is allowed to invoke).
    - **Constraints/policies:** map to _guards_ (pre‑conditions, auth, rate, tenancy).
- **Decide membrane granularity:**
    - Per‑domain, per‑bounded context, or per‑capability cluster.
    - The old spec’s module boundaries usually become _membrane groups_, not 1:1 endpoints.

---

### 2. Build a “spec adapter” layer, not a rewrite

Think of this as `Xi.Razor.Compat.OriginalV1`.

- **Canonical internal model:**
    - Define a _modern_ Xi‑native model (types, errors, capabilities).
    - The original spec is _projected_ into this model, never the other way around.
- **Adapter responsibilities:**
    - **Shape translation:** legacy request → canonical request; canonical response → legacy response (if needed).
    - **Semantic normalization:** map old enums, flags, and magic values into explicit Xi types.
    - **Defaults & fallbacks:** where the old spec was underspecified, encode deterministic defaults here.
- **Pattern:** treat the adapter as a _membrane implementation_, not a helper library.

---

### 3. Invocation‑layer membranes as contracts

Each membrane is a contract boundary with three concerns: _shape, semantics, and safety_.

- **Shape (IO contracts):**
    - Define Xi Razor request/response DTOs that correspond to old operations.
    - Keep them _flat and explicit_—no hidden polymorphism from the legacy world.
- **Semantics (behavioral mapping):**
    - For each legacy operation:
        - **Pre‑conditions:** what must be true before invocation?
        - **Side‑effects:** what external state can change?
        - **Idempotency:** is it safe to retry?
    - Encode these as metadata on the membrane (e.g., idempotent, read‑only, transactional).
- **Safety (guards & policies):**
    - Map legacy auth/roles into Xi capability tokens or scopes.
    - Add rate limits and tenancy boundaries at the membrane, not deep inside handlers.

---

### 4. Error and state model alignment

This is where old specs usually poison modern layers if not isolated.

- **Error taxonomy:**
    - Build a Xi‑native error taxonomy: `InvalidInput`, `Conflict`, `NotFound`, `PreconditionFailed`, `Internal`.
    - Map legacy codes/strings into this taxonomy in the adapter.
- **State transitions:**
    - If the old spec has implicit state machines (e.g., `PENDING → ACTIVE → ARCHIVED`):
        - Make them explicit in Xi as state diagrams or enums.
        - Membranes enforce legal transitions; handlers implement them.

---

### 5. Versioning and coexistence

You want to be able to run “original spec semantics” and “Xi‑native semantics” side‑by‑side.

- **Versioned membranes:**
    - `OriginalV1Membrane` vs `XiV2Membrane` for the same domain.
    - Routing layer chooses membrane based on client, feature flag, or version header.
- **Deprecation path:**
    - Start with 1:1 mapping from old operations.
    - Introduce new Xi‑native operations that _compose_ the old ones internally.
    - Gradually move clients to Xi‑native; keep the original membrane as a compatibility shell.

---

### 6. Concrete mapping checklist

If you drop me the actual artifacts, I can do this mechanically. Until then, here’s a tight checklist:

- **Inventory:**
    - **List:** all legacy operations, types, error codes, and implicit workflows.
- **Design:**
    - **Define:** Xi canonical types and error taxonomy.
    - **Group:** operations into membrane modules (by domain/capability).
- **Implement:**
    - **Create:** `Compat.OriginalV1` adapter layer.
    - **Wire:** each legacy operation → Xi membrane endpoint → Xi handler.
- **Validate:**
    - **Golden tests:** legacy request/response pairs must still round‑trip.
    - **Invariants:** idempotency, state transitions, and auth rules enforced at the membrane.

---

If you paste a slice of the original spec (one module, a few operations) and the current Xi Razor invocation schema, I can draft a literal mapping table and the adapter signatures—down to function names and type shapes.