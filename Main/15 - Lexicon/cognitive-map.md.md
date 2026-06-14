# Cross‑Lineage Cognate Map

A comparative map of terms that share structural or functional similarities across different conceptual lineages.

---## Multi‑Lineage Terms (Automatic Cognates)

TABLE term AS "Term", lineages AS "Lineages"
FROM "15 – Lexicon/151 – Terms"
WHERE length(lineages) > 1
SORT term ASC

## Cognate Clusters (Grouped by Shared Lineages)

TABLE term AS "Term", related_terms AS "Neighbors"
FROM "15 – Lexicon/151 – Terms"
WHERE length(related_terms) > 0
SORT term ASC

## Bridge‑Inferred Cognates

TABLE bridge_name AS "Bridge", related_terms AS "Terms"
FROM "15 – Lexicon/153 – Bridges"
SORT bridge_name ASC

## Notes

- **thread** behaves like a “bounded process” in Plan 9 and like an “ongoing evaluation context” in Korzybski.
- **protocol** resembles a “procedure” in Cognitive Science and a “uniform interface” in Plan 9.
- **claim** maps to Korzybski’s abstraction ladder and to analytic philosophy’s propositional logic.



