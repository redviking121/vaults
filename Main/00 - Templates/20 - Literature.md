---
type: literature
citekey:
title:
authors:
year:
publication:
lineages: []
terms: []
summary:
claims: []
notes: []
---
# {{title}}

## Summary
{{summary}}

## Key Claims
- 

## Notes
- 

## Terms (Conceptual Anchors)
```dataview
TABLE term AS "Term", short_definition AS "Definition"
FROM "15 – Lexicon/151 – Terms"
WHERE contains(file.link, this.file.link)

TABLE lineage AS "Lineage"
FROM "15 – Lexicon/152 – Lineages"
WHERE contains(related_items, this.file.link)

  
