# 140-all-errors-are-layer-mismatches

## Axiom
Most "application-level" errors are not failures of the application itself, but failures in the underlying sync, substrate, or transport layers.

## Application
When encountering a system error, do not attempt to fix the surface-level symptom. Instead, trace the error down to the substrate layer (e.g., file system, sync protocol, memory allocation) to identify the true point of failure.
