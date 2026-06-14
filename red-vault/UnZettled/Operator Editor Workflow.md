# Operator Editor Workflow

This document defines the editor roles, paste‑safety rules, file‑creation protocol, and terminal‑interaction guidelines for operator‑side tooling within the vault ecosystem. It establishes a consistent, low‑friction workflow for creating and maintaining scripts, notes, and operational artifacts.

---

## 1. Editor Roles

### Sublime Text — Primary Creation Surface

- Used for creating new scripts, tools, and structured documents.
    
- Ensures clean paste behavior with no hidden characters or formatting corruption.
    
- Provides deterministic indentation and UTF‑8‑safe handling.
    
- Preferred for any multi‑line or code‑heavy content.
    

### VS Code — Development Workspace

- Used for extended development, debugging, and multi‑file projects.
    
- Provides integrated terminal, linting, and refactoring tools.
    
- Heavier startup cost; not required for quick edits or single‑file tools.
    

### nano — Terminal‑Side Edits Only

- Used exclusively for small, in‑place edits on remote or local terminals.
    
- Not safe for pasting multi‑line code due to soft‑wrap, hidden characters, and bracketed‑paste issues.
    
- Never used for initial file creation.
    

---

## 2. Paste Safety Rules

### Sublime as the Safe Paste Surface

- All multi‑line code, JSON, YAML, or structured text must be pasted into Sublime.
    
- Sublime preserves exact byte‑level content with no transformations.
    

### Unsafe Paste Surfaces

- nano: may introduce soft‑wraps, invisible whitespace, or control sequences.
    
- terminal: may drop input or misinterpret bracketed‑paste sequences.
    

### Rule of Thumb

> If the content matters, paste into Sublime.

---

## 3. File Creation Protocol

### Creating New Files

1. Open Sublime.
    
2. Paste or write the content.
    
3. Save the file to the appropriate directory.
    
4. Apply executable permissions if needed (`chmod +x`).
    

### Never Create Files via nano

- Avoid `nano newfile.py` for initial creation.
    
- Avoid pasting into nano under all circumstances.
    

### Using `cat` for Raw Input (Rare)

- Only used when raw, unprocessed input is required.
    
- Not used for code or structured text.
    

---

## 4. Terminal Interaction Rules

### When to Use the Terminal

- Running scripts.
    
- Applying permissions.
    
- Navigating directories.
    
- Performing quick, single‑line edits via nano.
    

### When Not to Use the Terminal

- Creating new files.
    
- Pasting multi‑line content.
    
- Editing structured documents.
    

### Terminal State Awareness

- If paste or input behaves unexpectedly, restart the terminal session.
    
- Avoid relying on terminal buffers for critical content.
    

---

## 5. Known Failure Modes

### nano Failure Modes

- Soft‑wrap insertion.
    
- Hidden Unicode whitespace.
    
- Truncated paste blocks.
    
- Bracketed‑paste control sequences.
    

### Terminal Failure Modes

- Dropped input.
    
- Stuck in bracketed‑paste mode.
    
- EOF misfires.
    

### Mitigation

- Use Sublime for creation.
    
- Restart terminal sessions when behavior is suspect.
    

---

## 6. Operator Defaults

- Sublime is the canonical editor for all new tools and scripts.
    
- VS Code is optional and used only for extended development.
    
- nano is restricted to small, in‑place terminal edits.
    
- All structured content originates in Sublime.
    

---

## Summary

This workflow ensures deterministic, safe, and predictable handling of all operator‑side files. By standardizing editor roles and paste‑safety rules, the operator environment remains stable, clean, and free from hidden corruption sources.