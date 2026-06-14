---
title: ### Manifest compliance checklist (run per plugin)
timestamp: 2026-05-05T00:08:00
uid: 83f5ac9b
source: 202605050008.md
tags: [struct:question]
---
### Manifest compliance checklist (run per plugin)

You can treat this as a pass/fail sheet for each plugin. One row = one check.

|#|Area|Check question|Pass criteria|
|---|---|---|---|
|1|**File location**|Is `manifest.json` in the plugin root folder?|Single `manifest.json` at plugin root.|
|2|**ID format**|Is `id` lowercase, no spaces, unique, stable?|`^[a-z0-9\-]+$`, never renamed once released.|
|3|**Name**|Is `name` human‑readable and non‑conflicting?|Clear, not impersonating core/other plugins.|
|4|**Version**|Is `version` valid semver and bumped for each release?|`MAJOR.MINOR.PATCH`, matches release tag.|
|5|**Min app version**|Is `minAppVersion` present and realistic?|Set to the minimum Obsidian version actually tested.|
|6|**Main entry**|Does `main` point to an existing compiled JS file?|Path exists in build output; no TS/TSX here.|
|7|**Mobile support**|If `isDesktopOnly` is set, is that intentional and documented?|`true` only if mobile truly unsupported.|
|8|**Author**|Are `author` and `authorUrl` (if present) accurate?|Real maintainer, stable URL if used.|
|9|**Description**|Is `description` concise and accurate?|Explains core function in one short sentence.|
|10|**Funding**|If `fundingUrl` exists, is it a direct, safe link?|Points to maintainer’s funding page, not tracking spam.|
|11|**Tags**|Are `tags` relevant and non‑spammy (if used)?|Only meaningful keywords, no keyword stuffing.|
|12|**Repo metadata**|Do repo name/readme match `id`/`name` reasonably?|User can map plugin in UI ↔ repo without confusion.|
|13|**Build artifacts**|Are only needed build files shipped (no source junk)?|No large caches, logs, or private files in release.|
|14|**Permissions**|Does plugin avoid unnecessary file/network access?|No hidden remote calls; any access is documented.|
|15|**Settings registration**|If plugin has settings, are they reachable and stable?|Settings tab loads; no runtime errors on open.|
|16|**Commands**|Are commands named clearly and grouped logically?|No duplicate/confusing names; work without errors.|
|17|**Icons/assets**|Do icon paths in code actually exist in the bundle?|No 404s; SVG/PNG sizes reasonable.|
|18|**Error handling**|Does plugin fail gracefully if Obsidian APIs change?|Try/catch or guards around non‑critical features.|
|19|**License**|Is there a clear license in the repo?|OSI‑style or explicit terms; matches community norms.|
|20|**Changelog**|Is there a minimal changelog tied to versions?|Each released `version` has a short entry.|

If you want, I can turn this into a literal checklist template (Markdown form) you can drop into your vault and tick per plugin.