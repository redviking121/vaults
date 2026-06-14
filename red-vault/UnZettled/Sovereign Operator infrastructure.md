This is a classic "Sovereign Operator" infrastructure problem. When plugins break, you must move to **protocol-based integration** rather than relying on brittle API-based plugins.

If you are considering a shared-folder architecture between Zotero, Logseq, and Obsidian, here is the most robust way to structure it to maintain your "Governance Pentad" integrity.

### 1. The Architecture: "The Intake Manifold"
Do **not** create separate vaults for each tool. That will fragment your cognitive substrate. Instead, use a **single Obsidian Vault** as your "Master Substrate" and treat Logseq and Zotero as "Peripheral Input Engines."

*   **The Shared Folder:** Create a folder in your Obsidian vault called `00_Intake`.
*   **Zotero Configuration:** Use the [Better BibTeX](https://retorque.re/zotero-better-bibtex/) plugin in Zotero to export your library as a `.bib` file directly into your Obsidian vault (e.g., `00_Intake/Library.bib`).
*   **Logseq Configuration:** Point Logseq to a folder *inside* your Obsidian vault (e.g., `00_Intake/Logseq_Notes`). Logseq will treat this as its own graph, but because it is inside your Obsidian vault, all your notes are physically co-located.

### 2. The Intake Protocol (The "Manifold")
To keep this from becoming a mess, you need a strict **Intake Protocol**:

1.  **Zotero (The Source):** Zotero remains your "Reference Manager." You do not write in Zotero. You use Zotero to capture PDFs and metadata.
2.  **Logseq (The "Flash" Engine):** Use Logseq for high-velocity, daily, bulleted "flurry" notes. Because it is pointing to `00_Intake/Logseq_Notes`, these notes are immediately available in Obsidian.
3.  **Obsidian (The Governance Spine):** This is where you perform the "Razor" work. You periodically move notes from `00_Intake` into your `20_Zettels` folder, where they are then linked to your **Governance Pentad**.

### 3. Why this works for your "Sovereign Operator" model:
*   **No Fragmentation:** All your notes remain in one physical location (your Obsidian vault).
*   **Tool-Agnostic:** If Logseq breaks, you just stop using it. Your notes are already in Obsidian. If Zotero breaks, you still have your library.
*   **Governance-First:** You are not "integrating tools"; you are "routing inputs." The `00_Intake` folder acts as a buffer—a "Cognitive Overflow Buffer"—that prevents raw input from polluting your governed Zettelkasten.

### 4. Managing the Intake
To manage this without a plugin, you need a **"Triage Protocol"**:

*   **Daily/Weekly Sweep:** Once a week, you perform a "Triage" of the `00_Intake` folder.
*   **The Razor Test:** As you move a note from `00_Intake` to `20_Zettels`, you apply the **[[Xi Paradox Razor]]**. If it doesn't fit the Pentad, it stays in `00_Intake` or is discarded.

**Does this "Intake Manifold" architecture feel like it would reduce the friction you've been experiencing?** It keeps the "beasties" in their cages (the folders) until you are ready to govern them (the maps).

#### Sources
[^1]: [Scientific Workflows with Zotero](https://discuss.logseq.com/t/scientific-workflows-with-zotero/8205)
[^2]: [Zotero Integration help](https://www.reddit.com/r/ObsidianMD/comments/1g7ou0r/zotaro_integration_help/)