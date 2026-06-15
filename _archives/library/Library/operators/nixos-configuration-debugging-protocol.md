---
status: processed
type: operator
---

# NixOS Configuration Debugging Protocol

This protocol formalizes the "three failure modes" diagnostic for NixOS configurations.

## The Three Failure Modes
1.  **Nested Blocks:** Incorrect indentation or scope closure.
2.  **Missing Semicolons:** The most common syntax error in Nix.
3.  **Scope Errors:** Referencing variables outside their defined scope.

## Workflow
1.  **Isolate:** Identify the specific block where the error occurs.
2.  **Structure:** Verify the indentation and brace matching.
3.  **Syntax:** Check for missing semicolons or incorrect attribute assignments.
4.  **Scope:** Ensure all variables are defined within the current or parent scope.
