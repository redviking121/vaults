# Batching Doctrine

## Purpose
Define the philosophy and operational rules for high‑volume note creation.

---

## Core Principle
Batching must be **braindead** — zero friction, zero thought, zero drift.

---

## Why Option B
- Shell scripts introduce friction and require maintenance.
- Templater alone cannot guarantee structural consistency.
- Plugin alone cannot handle template logic.

**Templater + Plugin** gives:
- Correct structure
- Correct metadata
- Correct filenames
- Zero post‑hoc cleanup

---

## Operational Rules
- All batch‑created notes must use plugin commands.
- No manual file creation.
- No shell scripts for conformity.
- Templates remain the single source of truth.

---

## Outcome
A Library that scales indefinitely without entropy.
