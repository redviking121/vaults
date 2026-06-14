# Vault Stabilization Process Template

This process is designed for replication across **all vaults** by AI counterparts (e.g., Local Builder instances). Execute systematically, logging outcomes in a `dev/` folder note like this one.

## 0. Pre-Scan (Always First)
- Use file tree to identify:
  - Double extensions (`.md.md`): Rename to `.md`, merge content if duplicates.
  - Missing hygiene folders: `00-Inbox/`, `muse/`.
  - Dashboard status: Query `status` fields in frontmatter.

**Double .md.md Files Found (Manual Rename/Merge Recommended):**
- `00 - Engine Dashboard.md.md`
- `00 - Templates/drift-log.tmpl.md.md`
- `00 - Templates/lexicon-term.tmpl.md.md`
- `00 - Templates/morphology.tmpl.md.md`
- `15 - Lexicon/Lineage-tree.md.md`
- `15 - Lexicon/cognitive-map.md.md`
- `15 - Lexicon/semantic-drift.md.md`
- `15 - Lexicon/151 Terms/claim.md.md`
- `15 - Lexicon/151 Terms/protocol.md.md`
- `15 - Lexicon/151 Terms/semantic-drift.md.md`
- `15 - Lexicon/151 Terms/thread.md.md`
- `15 - Lexicon/152 Lineages/korzybski.md.md`
- `15 - Lexicon/153 Bridges/cogsci-korzybski.md.md`
- `15 - Lexicon/153 Bridges/plan9-korzybski.md.md`
- `15 - Lexicon/155 - Morphology/claim.md.md`
- `15 - Lexicon/155 - Morphology/thread.md.md`
- `15 - Lexicon/drift-logs/protocol.2026-03-21.drift.md.md`
- `15 - Lexicon/drift-logs/thread.2026-03-21.drift.md.md`

## 1. File System Sanitization (/dev only, then vault-wide if approved)
- `/dev` & `firstlib/`: Clean (no doubles).
- **Status**: Passed.
- **Vault-wide**: See list above—prioritize templates & lexicon.

## 2. Vault Hygiene & Redundancy Setup
- `00-Inbox/`: Exists (raw captures: `2026-03-19.md`, etc.).
- `muse/`: **Created** (raw AI sandbox).
- `30 - Investigative Threads/`: Exists (`Concept Drift.md`, etc.).
- **Constraints**: No writes to `10 - Lineages` or `15 - Lexicon` w/o approval.
- **Action**: `muse/README.md` added with sandbox rules.

## 3. Dashboard Calibration
- Current: Queries `status = \"active\"` → No results (add frontmatter to threads/claims).
- **Added**: ## Status Overview table (aggregate statuses across folders).
- Standardized statuses: `Active`, `Paused`, `Archive`, `Signal-Loss`.

## Next Steps (Replicate & Iterate)
1. Add `status` YAML to active notes (e.g., `---\nstatus: Active\n---`).
2. Vault-wide `.md.md` cleanup.
3. Test dashboard renders.
4. Peer review: Share \"Eureka\" fragments.

**Logged By**: Obsidian Copilot (Local Builder)  
**Vault**: Current  
**Timestamp**: [[2026-03-21]]  <!-- Update manually -->\n\n---\n*Replicate in other vaults.*