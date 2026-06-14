## Magic-Copy First-Time Guide: Left Foot, Right Foot 🥾

**Setup confirmed:** Migration subdir open (e.g., `Ops-Vault/migration/Chunk0-File2.md.md`) in one panel. [Fragment-5-Magic-Copy-Icon-as-Structural-Ally](obsidian://open?file=Fragment-5-Magic-Copy-Icon-as-Structural-Ally.md) in the other. **Do ONE file at a time** (start with Chunk0-File2.md.md).

### Left Foot → Right Foot Sequence (2 mins per file):

1. **Left Foot: Open the bad file fully.**
    
    - Click `Chunk0-File2.md.md` → ensure **Reading View** or **Live Preview** (not Source Mode yet).
    - Scroll to top → confirm content looks good (no corruption).
2. **Right Foot: Activate Magic-Copy.**
    
    - In the **editor pane** (top-right of note), find the **📋 copy icon** (magic-copy – next to pencil/edit icon).
    - **Click 📋 once** → it copies **entire note content** (frontmatter + body) atomically (no metadata junk).
    - **Verify copy:** Paste into a temp note (Ctrl+V) → matches? Good. Close temp.
3. **Left Foot: Create clean new file.**
    
    - Right-click in `Ops-Vault/migration/` folder pane → **New note**.
    - Name it **exactly**: `Chunk0-File2.md` (drop the extra .md).
    - Hit Enter → opens blank note.
4. **Right Foot: Paste & Save.**
    
    - In new note → **Ctrl+V** (paste magic-copied content).
    - **Ctrl+S** (save) → frontmatter intact, no double-ext issues.
    - **Optional:** Add `status: Active` at top YAML for dashboard.
5. **Left Foot: Nuke the old ghost.**
    
    - Right-click old `Chunk0-File2.md.md` → **Delete** (trash icon or Move to trash).
    - **Refresh vault** (Ctrl+R or reload) → new file indexes clean.
6. **Right Foot: Quick Verify.**
    
    - Open new `Chunk0-File2.md` → content matches old? Links work?
    - Check [00 - Engine Dashboard](obsidian://open?file=Ops-Vault%2F20_DASHBOARDS%2F00%20-%20Engine%20Dashboard.md) → new note appears if status added.

**Repeat for next:** Chunk0-File3.md.md → Chunk0-File15.md.md → etc. (27 total, batch 5-10 now).

**Pro Tip (from Fragment):** Magic-copy = "book truck" → moves content without shelf chaos. No drag-drop (risks links).

**Stuck?** Reply "Did Chunk0-File2 – screenshot error?" I'll debug. 10 files done → dashboard glows. Vault atoms assembling! ⊚