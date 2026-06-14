# Core Stabilization

## Purpose
Define how contradictions in item state are resolved.

## Stabilization Rules
- Prefer the most recent authoritative update.
- If timestamps conflict, prefer explicit operator action.
- Metadata merges are deep unless keys collide.

## Failure Modes
- Missing IDs → reject.
- Conflicting categories → escalate to operator.
- Corrupted provenance → quarantine item.

## Notes
Stabilization is the boundary between prototype chaos and substrate order.
