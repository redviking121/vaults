---
id: ax-technical-012
title: Fail loud and fast
status: active
category: technical
version: 1
created: 2026-05-05
last_review: 2026-05-05
---

# Fail loud and fast

**Statement:**  
Systems must surface failures immediately and explicitly rather than allowing silent degradation.

**Rationale:**  
- Silent failures create cascading, hard-to-debug states.  
- Early failure reduces blast radius and recovery time.

**Implications:**  
- Emit clear errors when invariants are violated.  
- Reject designs that hide or defer failure.

**Examples:**  
- Accept: Immediate exception on invalid state.  
- Reject: Silent fallback to default behavior.

**Related:**  
- ax-operator-010  
- ax-epistemic-003
