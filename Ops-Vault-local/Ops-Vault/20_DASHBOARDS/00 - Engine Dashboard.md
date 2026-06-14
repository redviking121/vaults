---
status: Active
role: dashboard
project: vault-cleanup
---

# 00 - Engine Dashboard

## Status Tracking Table

Standard status values: Active, Paused, Archive, Signal-Loss

```dataview
TABLE 
  file.link AS "Note", 
  status AS "Status",
  project AS "Project"
FROM ""
WHERE file.frontmatter.status
SORT status ASC, file.name ASC
```

## Quick Actions

- [[cockpit]]
- [[today]]
- [[week]]
- [[review]]
