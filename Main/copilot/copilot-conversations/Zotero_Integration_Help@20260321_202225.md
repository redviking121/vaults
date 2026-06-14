---
epoch: 1774138945993
modelKey: "copilot-plus-flash|copilot-plus"
topic: "Zotero Integration Help"



tags:
  - copilot-conversation
---

**user**: i need help getting zotero integrated here 
[Timestamp: 2026/03/21 20:22:25]

**ai**: To integrate Zotero with your Obsidian vault (especially since you already have a ready-to-use `[[literature]]` template in `00 - Templates/literature.md` that pulls in citations, abstracts, annotations, and Zotero URIs), follow these steps. This uses the popular **Zotero Integration** community plugin, which matches your template's variables (e.g., `{{citekey}}`, `{{abstractNote}}`, annotations).

### Prerequisites
- **Zotero desktop app**: Download/install from [zotero.org](https://www.zotero.org/download/). Run it in the background.
- **Better BibTeX add-on** (required for citation keys and fast imports):
  1. In Zotero, go to **Tools > Add-ons > Install Add-on from File**.
  2. Download/install from [retorque.re/zotero-better-bibtex](https://retorque.re/zotero-better-bibtex/installation/).
  3. Restart Zotero.
  4. Go to **Edit > Preferences > Better BibTeX > Citation keys**:
     - Set **Citation key pattern** to `[auth:lower][year]` (or similar, e.g., `smith2023`).
     - Enable **Auto-export** (e.g., to a `better-bibtex.json` library in your vault root for backups).

### Obsidian Setup
1. **Install plugins** (if not already):
   - **Zotero Integration** (by Mohamed Abdalla): Search in **Settings > Community plugins > Browse > Zotero Integration**.
   - **Templater** (recommended for your template): Same place, enables `{% %}` syntax in `literature.md`.
   - Optional: **Dataview** (your template uses it for questions).

2. **Configure Zotero Integration plugin**:
   - Go to **Settings > Zotero Integration**.
   - Set **Template path**: `00 - Templates/literature.md`.
   - **Image path**: e.g., `Attachments/{{citekey}}` (creates folders for PDFs/images).
   - **Library path**: Leave default or point to your Zotero library.
   - Test connection: Zotero must be running.

3. **Usage Workflow**:
   - In Obsidian, open Command Palette (`Cmd/Ctrl + P`).
   - Run **Zotero Integration: Import from Zotero** (select item by title/author).
   - Pick your `literature.md` template → New note created with:
     - Frontmatter: citekey, authors, DOI, Zotero URI (clickable: `zotero://select/...` opens item).
     - Abstract, notes, annotations (with highlights/images).
     - Dataview query for your #Q tags.
   - Cite in other notes: Use **Zotero Integration: Insert citation** (`@citekey` → `[@smith2023]`).

### Example Output from Your Template
A new note might look like:
```
---
citekey: smith2023
zotero: "zotero://select/items/1ABCDEF..."
...

## Abstract
> [Abstract text here]

## Annotations
>[!quote|yellow] Important
>Annotated text [(p. 5)](zotero://open-pdf/...) 
```

### Troubleshooting
- **No connection**: Ensure Zotero + Better BibTeX running. Check plugin settings for errors.
- **Missing annotations**: In Zotero, highlight PDF text → right-click > **Add Note to Item**.
- **PDFs not attaching**: Set Zotero's **Linked Attachment Base Directory** to your vault's `Attachments/` folder.
- **Custom tweaks**: Edit `literature.md` for more fields (full vars: see [plugin docs](https://github.com/mohamedabdalla/obsidian-zotero-integration)).
- Vault-specific: Your template is perfect—no changes needed. Test by importing a Zotero item.

If it's not working (e.g., error messages, plugin not installed), share details like plugin status or errors. Need help with a specific Zotero item? Paste its citekey! 

[^1]: [[20 - Literature]] (00 - Templates/literature.md)

#### Sources
[^1]: [[20 - Literature]] (00 - Templates/literature.md)
[Timestamp: 2026/03/21 20:23:01]