# Library Bootstrap Note

## Purpose
This document describes how to initialize, restore, or migrate the Library system.  
It is the single source of truth for bringing the architecture online.

---

## 1. Required Structure

Library/
  Templates/
    Classes/
    Commands/
  Operators/
  .obsidian/
    plugins/
      library-note-factory/

Ensure these directories exist before enabling the system.

---

## 2. Install Components

### Class Templates
Place all class templates into:
`Library/Templates/Classes/`

### Command Templates
Place all Templater command scripts into:
`Library/Templates/Commands/`

### Plugin
Place the Library Note Factory plugin folder into:
`Library/.obsidian/plugins/library-note-factory/`

Enable the plugin in Obsidian.

---

## 3. Validate the System

### Check 1 — Templates
Open any class template.  
Confirm:
- frontmatter exists  
- headings exist  
- no logic is embedded  

### Check 2 — Commands
Run a Templater command manually.  
Confirm:
- filename is correct  
- UID is correct  
- template is injected  

### Check 3 — Plugin
Trigger a plugin command.  
Confirm:
- file is created  
- Templater runs  
- structure is correct  

---

## 4. Optional: Bind Hotkeys (Layer 42)
Assign one hotkey per class.  
Keep bindings atomic and mnemonic.

---

## 5. System Guarantees
Once bootstrapped:
- Every note is born correct  
- No drift accumulates  
- Batching remains frictionless  
- Architecture remains stable  

---

## 6. Recovery Procedure
If anything breaks:
1. Reinstall templates  
2. Reinstall commands  
3. Reinstall plugin  
4. Re-run validation  

The Library is designed to be fully reconstructable from this note.
