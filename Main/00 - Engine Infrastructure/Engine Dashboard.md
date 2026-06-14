# Engine Overview

## Active Threads
```dataview
TABLE thread_focus AS "Thread", guiding_question AS "Question", status
FROM "30 – Investigative Threads"
WHERE status = "active"
SORT file.mtime DESC

TABLE claim_text AS "Claim", status
FROM "40 – Claims & Evidence/Claims Under Evaluation"
SORT file.mtime DESC

TABLE evidence_text AS "Evidence", source_citekey AS "Source"
FROM "40 – Claims & Evidence/Evidence Clusters"
SORT file.mtime DESC

TABLE file.link AS "Source", zotero_citekey AS "Citekey"
FROM "50 – Operational/To Read – High Priority"
WHERE status = "unread"
SORT file.ctime ASC

TABLE file.link AS "Source", zotero_citekey AS "Citekey"
FROM "50 – Operational/To Read – High Priority"
WHERE status = "unread"
SORT file.ctime ASC

TABLE lineage AS "Lineage", origin_period, key_figures
FROM "10 – Lineages"
WHERE type = "lineage"
SORT lineage ASC

TABLE file.link AS "Note", zotero_citekey
FROM "10 – Lineages"
WHERE zotero_citekey
SORT file.mtime DESC

TABLE protocol_name AS "Protocol", protocol_stage AS "Stage", status
FROM "20 – Xi Protocols"
WHERE type = "xi-protocol"
SORT protocol_name ASC

TABLE protocol_name AS "Protocol", protocol_stage, inputs, outputs
FROM "20 – Xi Protocols"
GROUP BY protocol_stage

TABLE thread_focus AS "Thread", guiding_question AS "Question", related_protocols
FROM "30 – Investigative Threads"
WHERE status = "active"
SORT file.mtime DESC

TABLE thread_focus AS "Thread", related_lineages
FROM "30 – Investigative Threads"
WHERE contains(related_lineages, "Hermetic")  /* change lineage name as needed */

TABLE claim_text AS "Claim", related_evidence, status
FROM "40 – Claims & Evidence/Claims Under Evaluation"
WHERE type = "claim"
SORT file.mtime DESC

TABLE evidence_text AS "Evidence", source_citekey
FROM "40 – Claims & Evidence/Evidence Clusters"
WHERE contains(supports_claims, "CLAIM_ID")   /* replace with actual claim file name */

TABLE file.link AS "Source", zotero_citekey, priority
FROM "50 – Operational/To Read – High Priority"
WHERE status = "unread"
SORT file.ctime ASC

TABLE quote_source AS "Source", themes
FROM "50 – Operational/Extracted Quotes"
WHERE type = "quote"
SORT file.mtime DESC

TABLE domains_involved AS "Domains", synthesis_focus AS "Focus"
FROM "60 – Bridge Domains"
WHERE type = "bridge"
SORT file.mtime DESC

TABLE file.link AS "Bridge Note", domains_involved
FROM "60 – Bridge Domains"
WHERE contains(related_lineages, "Daoist")

TABLE file.link AS "Note", origin_layer, archived_on
FROM "70 – Archive"
WHERE type = "archive"
SORT archived_on DESC

TABLE 
  thread_focus AS "Thread",
  guiding_question AS "Question",
  related_protocols AS "Protocols",
  related_lineages AS "Lineages",
  evidence_links AS "Evidence"
FROM "30 – Investigative Threads"
WHERE status = "active"
SORT file.mtime DESC

## Lexicon: Active Terms
TABLE term AS "Term", short_definition AS "Definition", lineages AS "Lineages"
FROM "15 – Lexicon/151 – Terms"
WHERE status = "active"
SORT term ASC

## Lexicon: Lineages
TABLE lineage AS "Lineage", domain AS "Domain"
FROM "15 – Lexicon/152 – Lineages"
WHERE status = "active"
SORT lineage ASC

## Lexicon: Bridges
TABLE bridge_name AS "Bridge", connection_summary AS "Summary"
FROM "15 – Lexicon/153 – Bridges"
WHERE status = "active"
SORT bridge_name ASC

## Lineages (from vault)

TABLE lineage AS "Lineage", domain AS "Domain", core_principles AS "Core Principles"
FROM "15 – Lexicon/152 – Lineages"
WHERE status = "active"
SORT lineage ASC

## Lineage Tree (grouped by domain)

LIST lineage
FROM "15 – Lexicon/152 – Lineages"
WHERE status = "active"
GROUP BY domain

## Cross-Lineage Bridges

TABLE bridge_name AS "Bridge", lineage_a AS "A", lineage_b AS "B", connection_summary AS "Summary"
FROM "15 – Lexicon/153 – Bridges"
WHERE status = "active"
SORT bridge_name ASC

## Notes

- Korzybski ↔ Plan 9 share structural clarity and anti‑hidden‑state philosophy.
- Cognitive Science ↔ Korzybski overlap in abstraction and representation.
- Plan 9 ↔ Cognitive Science overlap in operator sequences and uniform interfaces.
  
## Term Usage Across Vault

TABLE file.link AS "Note", term AS "Term", short_definition AS "Definition"
FROM "15 – Lexicon/151 – Terms"
FLATTEN related_terms AS rt
SORT term ASC

## Drift by Thread

TABLE term AS "Term", file.link AS "Thread", status AS "Status"
FROM "30 – Investigative Threads"
FLATTEN contains AS c
WHERE c = term
SORT term ASC
contains:
  - thread
  - claim
  - protocol

## Semantic Drift Notes (Reactive)

- **thread**: How does its meaning shift between exploratory vs. evaluative threads?
- **claim**: Does it drift toward “assertion,” “hypothesis,” or “proposition” depending on context?
- **protocol**: Does it behave more like a “procedure,” “operator,” or “ritual” depending on lineage?
  
  ## Term Usage Across Vault

TABLE file.link AS "Note", term AS "Term", short_definition AS "Definition"
FROM "15 – Lexicon/151 – Terms"
FLATTEN related_terms AS rt
SORT term ASC

## Drift Logs

TABLE term AS "Term", observed_shift AS "Shift", date AS "Date", thread AS "Thread"
FROM "15 – Lexicon/drift-logs"
SORT date DESC

## Morphology

TABLE term AS "Term", root_lineage AS "Root Lineage", stem_form AS "Stem"
FROM "15 – Lexicon/155 – Morphology"
SORT term ASC

## Morphology by Lineage

TABLE term AS "Term", root_form AS "Root", stem_form AS "Stem"
FROM "15 – Lexicon/155 – Morphology"
GROUP BY root_lineage

TABLE term AS "Term", short_definition AS "Definition"
FROM "15 – Lexicon/151 – Terms"
FLATTEN lineages AS lineage
GROUP BY lineage
SORT term ASC

TABLE term AS "Term", related_terms AS "Neighbors"
FROM "15 – Lexicon/151 – Terms"
WHERE length(related_terms) > 0
SORT term ASC




