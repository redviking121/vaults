---
title: **Crystallized.**
timestamp: 2026-05-04T23:51:00
uid: 7ca7873a
source: 202605042351.md
tags: [status:actionable, struct:future, struct:list]
---
**Crystallized.**  
What follows is the _operator‑grade architecture_ for the **Structural Note Inspector** — the full skeleton, no code, no drift, no fluff. This is the blueprint you’d hand to an engineer and they’d know exactly what to build.

---

## **Structural Note Inspector — Operator Architecture**

### **1. Purpose (Single Sentence, Zero Ambiguity)**

Expose the structural state of the current note — frontmatter, headings, tags, links, and structural invariants — and surface deviations from expected patterns.

This plugin is not about content. It is about **shape**.

---

## **2. Command Surface (User‑Facing Entry Points)**

- **Command: “Inspect Note Structure”**  
    Opens the inspector panel for the active file.
    
- **Command: “Refresh Structural Analysis”**  
    Re-runs the analysis without reopening the panel.
    
- **Command: “Toggle Structural Inspector Panel”**  
    Dock/undock the panel in the workspace.
    

These three commands give you the full lifecycle: open → inspect → re-inspect.

---

## **3. UI Surface (What the User Sees)**

### **Panel Layout**

A right‑side docked panel with four sections:

1. **Frontmatter**
    
    - Parsed YAML
    - Missing required keys (configurable later)
    - Malformed YAML warnings
2. **Headings**
    
    - Ordered list of headings with levels
    - Heading hierarchy anomalies (e.g., jumping from H1 → H3)
3. **Tags**
    
    - Inline tags
    - Frontmatter tags
    - Duplicates or namespace violations
4. **Links**
    
    - Internal links
    - Broken links (via metadata cache)
    - External links

Each section has:

- A **status icon** (OK / Warning / Error)
- A **details list**
- A **“jump to location”** action for each item

---

## **4. Data Flow (How Information Moves)**

1. **Trigger**
    - User runs command OR note changes (optional later)
2. **Acquire**
    - Get active file path
    - Read file contents
    - Pull metadata from Obsidian’s metadata cache
3. **Parse**
    - Extract frontmatter
    - Extract headings
    - Extract tags
    - Extract links
4. **Analyze**
    - Validate frontmatter structure
    - Validate heading hierarchy
    - Validate tag namespace rules
    - Validate link integrity
5. **Render**
    - Push results into the panel UI
6. **Update**
    - Re-run analysis on file change events (optional toggle)

This is a clean, linear pipeline. No branching, no magic.

---

## **5. Event Triggers (When It Runs)**

- **onCommand:** manual inspection
- **onActiveLeafChange:** optional auto-refresh
- **onFileModify:** optional auto-refresh
- **onLayoutReady:** restore panel state

You can start with only the command trigger and add the others later.

---

## **6. Error Modes (Operator‑Visible Failure States)**

- **No active file** → “No note selected.”
- **File has no frontmatter** → “Frontmatter missing.”
- **YAML parse error** → show line number and raw error
- **Metadata cache unavailable** → “Metadata not ready.”
- **Broken links** → list each with target path

Every error is surfaced as a structural fact, not a crash.

---

## **7. Minimal Viable Feature Set (v0.1)**

This is the smallest version that is still _real_:

- Command: Inspect Note Structure
- Panel with four sections
- Frontmatter extraction + missing/invalid detection
- Heading extraction + hierarchy validation
- Tag extraction + duplicate detection
- Link extraction + broken link detection
- Manual refresh

This is enough to validate your environment, your build pipeline, and your Obsidian API integration.

---

## **8. Optional v0.2+ Enhancements (Not part of v0.1)**

- Auto-refresh on file change
- Configurable required frontmatter keys
- Configurable tag namespace rules
- Suggested fixes (click to insert)
- Export structural report
- Inline gutter markers
- Integration with your Xi/Razor substrate (structural invariants)

These are future layers, not part of the crystallization.

---

## **9. Operator Notes (The Philosophy Behind It)**

- This plugin is a **structural mirror** — it shows the note’s skeleton.
- It enforces **shape**, not meaning.
- It is the perfect first real plugin because it touches:
    - file I/O
    - metadata cache
    - workspace UI
    - commands
    - events
- It becomes a **reusable pattern** for every future plugin you build.

This is your “instrument before weapon” moment.

---

If you want, the next step is:

**“Generate the implementation plan.”**

That’s the step where we turn this architecture into a build sequence you can execute in one sitting.