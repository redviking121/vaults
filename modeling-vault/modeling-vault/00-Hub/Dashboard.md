---
type: hub
status: Active
tags: [hub, dashboard]
---

# Vault Dashboard

## Status Tracking

**Standard status values:** `Active`, `Paused`, `Archive`, `Signal-Loss`

```dataview
TABLE file.link as "Note", status, file.mtime as "Modified"
FROM ""
WHERE status
SORT status ASC, file.ctime DESC
LIMIT 50
```
 
**Notes without status:**
```dataview
LIST file.link
FROM ""
WHERE !status
SORT file.name ASC
LIMIT 20
```

## Inbox
![[Inbox]]

## Recent Notes
```dataview
TABLE type, status, file.ctime as "Created"
FROM ""
WHERE type != "hub"
SORT file.ctime DESC
LIMIT 10
```

## Orphan Notes
```dataview
LIST
FROM "01-Zettel/permanent"
WHERE length(file.outlinks) = 0 AND length(file.inlinks) = 0
```

## Fleeting Notes — Expiring Soon
```dataview
TABLE promote-by AS "Promote By", file.ctime as "Created"
FROM "01-Zettel/fleeting"
WHERE promote-by <= date(today) + dur(3 days)
SORT promote-by ASC
```

## Active Models
```dataview
TABLE version, status, file.mtime as "Modified"
FROM "02-Models/active"
SORT file.mtime DESC
```

## Active Projects
```dataview
TABLE status, deadline, file.mtime as "Modified"
FROM "05-Projects/active"
SORT deadline ASC
```
