# Core Invariants

## Structural Invariants
- Every item must have a valid `id`.
- No item may exist without a category.
- Metadata keys must be strings.
- Provenance must be traceable.

## Behavioral Invariants
- No silent mutation of fields.
- All merges must preserve identity.
- Deletions must be explicit.

## Operator Notes
These invariants prevent drift and ensure the prototype remains stable.
