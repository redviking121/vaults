# Lineage Tree

A structural map of conceptual lineages in the investigative engine.

## Tree (manual view)

- **Korzybski**
  - General Semantics
  - Multi-ordinality
  - Abstraction layers

- **Plan 9**
  - Operating Systems
  - Namespaces
  - File-as-object ontology

- **Cognitive Science**
  - Procedural knowledge
  - Representations
  - Operator sequences
  - ## Terms by Lineage

TABLE term AS "Term", short_definition AS "Definition"
FROM "15 – Lexicon/151 – Terms"
FLATTEN lineages AS lineage
GROUP BY lineage
SORT term ASC