# Core Model — Unified Systems Inventory

## Purpose
Define the structural identity of an inventory item within the prototype layer.

## Item Schema
- `id`: stable identifier (string)
- `name`: human‑readable label
- `category`: classification
- `location`: physical or logical placement
- `metadata`: arbitrary key/value map
- `provenance`: source, acquisition, or origin trail

## Identity Rules
- IDs must be globally unique within the prototype.
- Items are immutable except through reconciliation.
- Metadata is additive unless explicitly overwritten.

## Notes
This model defines *shape*, not *behavior*. Behavior lives in Reconcile.
