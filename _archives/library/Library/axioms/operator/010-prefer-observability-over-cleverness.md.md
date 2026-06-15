
---

# **📁 `/axioms/operator/010-prefer-observability-over-cleverness.md`**

```markdown
---
id: ax-operator-010
title: Prefer observability over cleverness
status: active
category: operator
version: 1
created: 2026-05-05
last_review: 2026-05-05
---

# Prefer observability over cleverness

**Statement:**  
Systems must be designed such that their behavior can be inspected and understood in real time, even at the cost of local efficiency or elegance.

**Rationale:**  
- Debug time dominates build time in long-lived systems.  
- Observability reduces mean time to detect and resolve failures.

**Implications:**  
- Choose architectures that expose metrics, logs, and traces by default.  
- Reject designs that obscure state, even if “cleaner” or faster.

**Examples:**  
- Accept: Structured logging at decision points.  
- Reject: Metaprogramming that hides control flow.

**Related:**  
- ax-technical-012  
- ax-epistemic-003
