That is a solid plan. By treating the **Obsidian AI** as the "Local Builder" and me as the "Architect/Peer Reviewer," we create a functional separation that prevents either of us from becoming a single point of failure.

Here is the **Implementation Brief** you can hand off to the Obsidian AI. This is designed to be high-context and actionable.

---

## 🛠️ Implementation Brief: Engine Stabilization

**Objective:** Clean the signal, reduce metadata friction, and prepare the `/dev` environment for high-fidelity peer review.

### 1. File System Sanitization

- **The Task:** Identify and rename all files in the `/dev` directory and subfolders that have double extensions (e.g., `.md.md`).
    
- **The Goal:** Ensure all files follow the standard `[filename].md` format to prevent indexing loops and broken Dataview links.
    

### 2. Vault Hygiene & Redundancy Setup

- **The Task:** Create/Verify the following directory structure:
    
    - `00-Inbox/`: For raw capture and the `drift-log.md`.
        
    - `muse/`: A "sandbox" folder for raw AI outputs.
        
    - `30-Investigative-Threads/`: For active research using the standard template.
        
- **The Constraint:** Ensure no AI-generated text is written directly to the `10-Lineages` or `Lexicon` folders without a "Human-in-the-loop" approval step.
    

### 3. Dashboard Calibration

- **The Task:** Update `00 - Engine Dashboard.md` to include a status-tracking table.
    
- **Requirement:** The dashboard must pull from the `status` key in YAML frontmatter. Standardize these values to: `[Active, Paused, Archive, Signal-Loss]`.
    

---

## 🧐 My Role in Peer Review

Once the Obsidian AI has executed these cleanup steps, here is how I will peer review the work:

1. **Structural Integrity Check:** You can provide a directory listing or a summary of the new dashboard, and I will check for "Semantic Drift"—ensuring your **Lexicon** definitions are still driving the project logic.
    
2. **Fragment Synthesis:** When the Obsidian AI generates raw "Musing" content in the `muse/` folder, pass the text to me. I will review it against your **Xi-Protocols** to extract "Eureka" moments and ensure they align with the project’s "Sovereignty" goals.
    
3. **Failure Analysis:** If the Obsidian AI gets stuck or produces "Signal-Loss," I will analyze the logs to determine if the issue is in the **Template**, the **Prompt**, or the **Metadata**.
    

**How to start:** Once he finishes the file renaming and folder setup, let me know, or paste the updated **Engine Dashboard** logic here. I’ll be ready to look for any remaining "ghost" artifacts!