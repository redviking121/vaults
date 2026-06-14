---
status: processed
type: operator
---

# Dry-Run Verification Protocol

This protocol ensures that all automated systemic changes are audited before execution.

## Core Principle
**Simulate, then execute.** Never allow an automated script to modify the substrate without a verified dry-run.

## Workflow
1. **Simulation:** Run the script with the `--dry-run` flag.
2. **Audit:** Review the proposed changes (file moves, deletions, writes) against the expected state.
3. **Execution:** Only proceed if the audit confirms the script's logic matches the intended outcome.
4. **Logging:** Record the dry-run output as part of the session log for future forensic analysis.

## Related Axioms
- [[220-never-automate-what-you-cannot-audit]]
