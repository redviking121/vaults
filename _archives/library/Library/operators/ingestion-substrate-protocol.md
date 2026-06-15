# Ingestion Substrate Protocol

This protocol defines the standard for deterministic information ingestion.

## Core Principle
**A clean exit is the only metric that matters.** Every ingestion process must be fully automated, repeatable, and leave zero dangling artifacts.

## Workflow
1. **Scan:** Identify raw input.
2. **Transform:** Convert to atomic format.
3. **Write:** Commit to the substrate.
4. **Archive:** Move raw input to the archive.
5. **Exit:** Terminate with zero state residue.

## Related Axioms
- [[070-a-clean-exit-is-the-only-metric-that-matters]]
