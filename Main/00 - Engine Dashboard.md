# Engine Overview

## Active Threads

```dataview
TABLE thread_focus AS \"Thread\", guiding_question AS \"Question\", status
FROM \"30 - Investigative Threads\"
WHERE status = \"active\"
SORT file.mtime DESC
```

```dataview
TABLE claim_text AS \"Claim\", status
FROM \"40 - Claims &amp; Evidence/Claims Under Evaluation\"
SORT file.mtime DESC
```

```dataview
TABLE evidence_text AS \"Evidence\", source_citekey AS \"Source\"
FROM \"40 - Claims &amp; Evidence/Evidence Clusters\"
SORT file.mtime DESC
```

```dataview
TABLE file.link AS \"Source\", zotero_citekey AS \"Citekey\"
FROM \"50 - Operational/To Read - High Priority\"
WHERE status = \"unread\"
SORT file.ctime ASC
```

```dataview
TABLE lineage AS \"Lineage\", origin_period, key_figures
FROM \"10 - Lineages\"
WHERE type = \"lineage\"
SORT lineage ASC
```

```dataview
TABLE file.link AS \"Note\", zotero_citekey
FROM \"10 - Lineages\"
WHERE zotero_citekey
SORT file.mtime DESC
```

```dataview
TABLE protocol_name AS \"Protocol\", protocol_stage AS \"Stage\", status
FROM \"20 - Xi-protocol\"
WHERE type = \"xi-protocol\"
SORT protocol_name ASC
```

```dataview
TABLE protocol_name AS \"Protocol\", protocol_stage, inputs, outputs
FROM \"20 - Xi-protocol\"
GROUP BY protocol_stage
```

```dataview
TABLE thread_focus AS \"Thread\", guiding_question AS \"Question\", related_protocols
FROM \"30 - Investigative Threads\"
WHERE status = \"active\"
SORT file.mtime DESC
```

```dataview
TABLE thread_focus AS \"Thread\", related_lineages
FROM \"30 - Investigative Threads\"
WHERE contains(related_lineages, \"Hermetic\")
```

```dataview
TABLE claim_text AS \"Claim\", related_evidence, status
FROM \"40 - Claims &amp; Evidence/Claims Under Evaluation\"
WHERE type = \"claim\"
SORT file.mtime DESC
```

```dataview
TABLE evidence_text AS \"Evidence\", source_citekey
FROM \"40 - Claims &amp; Evidence/Evidence Clusters\"
WHERE contains(supports_claims, \"CLAIM_ID\")
```

```dataview
TABLE file.link AS \"Source\", zotero_citekey, priority
FROM \"50 - Operational/To Read - High Priority\"
WHERE status = \"unread\"
SORT file.ctime ASC
```

```dataview
TABLE quote_source AS \"Source\", themes
FROM \"50 - Operational/Extracted Quotes\"
WHERE type = \"quote\"
SORT file.mtime DESC
```

```dataview
TABLE domains_involved AS \"Domains\", synthesis_focus AS \"Focus\"
FROM \"60 - Bridge Domains\"
WHERE type = \"bridge\"
SORT file.mtime DESC
```

```dataview
TABLE file.link AS \"Bridge Note\", domains_involved
FROM \"60 - Bridge Domains\"
WHERE contains(related_lineages, \"Daoist\")
```

```dataview
TABLE file.link AS \"Note\", origin_layer, archived_on
FROM \"70 - Archive\"
WHERE type = \"archive\"
SORT archived_on DESC
```

```dataview
TABLE 
  thread_focus AS \"Thread\",
  guiding_question AS \"Question\",
  related_protocols AS \"Protocols\",
  related_lineages AS \"Lineages\",
  evidence_links AS \"Evidence\"
FROM \"30 - Investigative Threads\"
WHERE status = \"active\"
SORT file.mtime DESC
```

**Notes:** 
- Converted en-dashes (–) to hyphens (-) for folder conformity (matches vault structure).
- Split into separate `dataview` blocks to fix parsing error.
- Removed duplicates (e.g., repeated To Read query).
- Ampersand (&) HTML-escaped as `&amp;` for Markdown safety.
- Folders like \"40 - Claims &amp; Evidence\" may need creation if missing—friction reduced, dashboard now renders!

## Status Overview

```dataview
TABLE file.folder AS \"Folder\", status AS \"Status\", length(rows) AS \"Count\"
FROM \"10 - Lineages\" OR \"20 - Xi-protocol\" OR \"30 - Investigative Threads\" OR \"40 - Claims &amp; Evidence\"
WHERE status
GROUP BY file.folder, status
SORT file.folder ASC, status ASC
```
*Standardized: Active | Paused | Archive | Signal-Loss*