---
id: ax-operator-020
title: Operator intent must be reconstructible from artifacts
status: active
category: operator
version: 1
created: 2026-05-05
last_review: 2026-05-05
---

# Operator intent must be reconstructible from artifacts

**Statement:**  
Every operator action must leave behind enough structure that intent can be reconstructed without relying on memory or oral history.

**Rationale:**  
- Intent is required for audit, debugging, and governance.  
- Memory is lossy; artifacts are durable.

**Implications:**  
- Commands, notes, and changes must be logged or documented.  
- Reject workflows that rely on tacit knowledge.

**Examples:**  
- Accept: Commit messages that state purpose, not just action.  
- Reject: “Fixes stuff” with no context.

**Related:**  
- ax-technical-012  
- ax-ethics-001
