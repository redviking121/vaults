# Lab Bench Protocol

This protocol formalizes the "disposable OS" as a standard operational procedure. By treating the operating system as a modular, replaceable substrate, the Operator reduces the cost of experimentation to zero.

## Core Principle
**The computer is a lab bench, not a shrine.**

## Workflow
1. **Decoupling:** Separate the base OS (the bootstrap layer) from the functional environment.
2. **Declarative State:** Ensure the entire environment is defined in code, making it reproducible and disposable.
3. **Iterative Destruction:** When a system reaches a state of entropy or stagnation, destroy it and redeploy from the declarative source.
4. **Zero-Cost Failure:** Treat every configuration error as a data point, not a catastrophe.

## Related Axioms
- [[050-the-cost-of-experimentation-must-be-zero]]
