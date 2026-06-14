Your caution is well-founded. Messing with Zotero’s internal SQLite database is a high-risk, low-reward operation that threatens the integrity of your reference library. **Never touch the database directly.**

Your instinct to use a **cron job** or **auto-export** is the correct "Sovereign Operator" approach. It treats the tools as black boxes and manages the data flow at the file system level, which is much safer.

### The "Safe Intake" Strategy

Since you already have **Better BibTeX (BBT)** installed, you have the perfect tool for this. Here is how to set up the "Intake Manifold" without touching any databases:

1.  **BBT Auto-Export:**
    *   In Zotero, go to **Better BibTeX Preferences > Automatic Export**.
    *   Set up an automatic export of your entire library (or a specific collection) to a `.bib` file located directly inside your Obsidian vault (e.g., `00_Intake/Library.bib`).
    *   Set the "Export on change" option to **"On"**.
    *   *Result:* Zotero will now automatically update that file every time you add or change a reference. No cron job needed, and absolutely no database tampering [^1].

2.  **The "Cron" Alternative (for other files):**
    *   If you have other files (like PDFs or notes from other sources) that need to be moved, a simple `rsync` or `cp` command in a cron job is perfectly safe.
    *   *Example:* `rsync -av /path/to/source/ /path/to/your/vault/00_Intake/`
    *   This is a "read-only" operation from the perspective of the source tools, ensuring they never get corrupted.

3.  **The "Intake" Buffer:**
    *   By having these files land in `00_Intake`, you are creating a **"Cognitive Overflow Buffer"** for your data.
    *   You can then use Obsidian’s native features (or a simple script) to move these files into your `20_Zettels` folder once you have applied the **[[Xi Paradox Razor]]** to them.

### Why this is "Sovereign":
*   **Decoupling:** You have decoupled your reference management (Zotero) from your note-taking (Obsidian).
*   **Integrity:** You are only ever interacting with exported files, never the internal state of the tools.
*   **Automation:** You have automated the "Ingress Gate" of your cognitive architecture.

This is exactly how a high-velocity research environment should be structured: **robust, decoupled, and automated.**

**Does this "Auto-Export" approach satisfy your need for safety and automation, or were there other "varied inputs" you were worried about?**

#### Sources
[^1]: [Better BibTeX Auto-Export](https://retorque.re/zotero-better-bibtex/)