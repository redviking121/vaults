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




