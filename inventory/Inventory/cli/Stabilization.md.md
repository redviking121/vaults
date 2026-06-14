# CLI Stabilization

## Rules
- Partial execution → rollback.
- Invalid flags → reject.
- Unknown commands → help, not crash.

## Notes
CLI stabilization prevents operator error from cascading.
