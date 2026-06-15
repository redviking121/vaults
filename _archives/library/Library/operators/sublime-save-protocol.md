# Sublime Save Protocol

This protocol defines the approach for managing file persistence in a minimalist environment like Sublime Text.

## Core Principle
**Persistence is an intentional act.** By removing automatic prompts, the system ensures that every save is a deliberate decision, preventing the accumulation of "reflexive" data.

## Workflow
1. **Initial Commit:** Use `File → Save As...` to define the file's location in the substrate.
2. **Subsequent Commits:** Use `Ctrl+S` (or `Cmd+S`) for rapid, silent persistence.
3. **Audit:** If the system feels "quiet," it is not hiding information; it is waiting for your intent.

## Related Axioms
- [[270-minimalism-is-a-cognitive-filter]]
