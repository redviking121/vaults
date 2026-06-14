# 170-stage1-failures-are-deterministic

## Axiom
Low-level boot failures (specifically Stage 1) are always deterministic. They are traceable to a specific mismatch between the declarative configuration and the physical hardware state.

## Context
In a declarative system like NixOS, the configuration is the "truth." When the system fails to boot, it is not a "mystery"—it is a failure of the system to reconcile its truth with the physical substrate.

## Application
- Do not guess.
- Audit the hardware state against the declarative config.
- The "loudness" of the failure is a feature, not a bug.
