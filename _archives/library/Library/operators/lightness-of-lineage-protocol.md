# Lightness of Lineage Protocol

This protocol formalizes "architectural purity" as the primary metric for system selection. 

## Core Principle
A system's "lightness" is a measurable architectural metric defined by the absence of mutable global state and historical accumulation.

## Workflow
1. **Audit:** Evaluate a system's lineage. Does it carry "ghosts" of past configurations?
2. **Measure:** Assess the degree of statefulness. Is the system reproducible from a clean state?
3. **Select:** Prioritize systems that minimize legacy accumulation to maintain long-term viability.
