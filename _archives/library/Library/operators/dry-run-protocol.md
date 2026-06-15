# Dry-Run Protocol

This protocol formalizes the "preview-pass" as a mandatory operational standard for all batch-processing scripts.

## Core Principle
**Decouple intent from execution.** Never commit changes to the substrate without first auditing the proposed state.

## Workflow
1. **Audit:** Run the script with the `--dry-run` flag.
2. **Verify:** Inspect the output to ensure the proposed changes align with the intended outcome.
3. **Execute:** Only after verification, run the script in production mode.

## Related Axioms
- [[045-never-execute-on-the-substrate-without-a-preview]]
