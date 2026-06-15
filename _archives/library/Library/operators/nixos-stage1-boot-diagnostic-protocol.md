# NixOS Stage 1 Boot Diagnostic Protocol

## Purpose
To resolve Stage 1 boot failures by reconciling declarative configuration with physical hardware state.

## Workflow
1. **Capture:** Record the exact error message (the "loud" failure).
2. **Isolate:** Determine if the failure is in the initrd, the kernel, or the hardware interface.
3. **Reconcile:** Compare the `configuration.nix` (or hardware-config) against the current hardware reality.
4. **Debug:** Use the shell provided by the failure state to probe the substrate.
5. **Resolve:** Update the declarative config to match the reality.

## Related Axioms
- [[140-all-errors-are-layer-mismatches]]
- [[170-stage1-failures-are-deterministic]]
