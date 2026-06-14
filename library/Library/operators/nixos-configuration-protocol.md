# NixOS Configuration Protocol

This protocol defines the approach for debugging declarative systems like NixOS, shifting the focus from imperative "fixing" to structural verification.

## Core Principle
**Treat configuration as a formal specification.** Debugging is an act of architectural audit, not trial-and-error.

## Workflow
1. **Audit:** When a failure occurs, do not tweak the system. Audit the `configuration.nix` for structural misalignments (nested blocks, scope errors, missing definitions).
2. **Verify:** Validate the configuration against the intended system state.
3. **Compile:** Rebuild the system to manifest the corrected state.

## Related Axioms
- [[600-in-a-declarative-system-the-config-is-the-truth]]
