# Troubleshooting Card — Library System

## Purpose
Provide a rapid, operator‑grade diagnostic flow for failures in the Library system.  
This card is used under load, during drift events, or when note creation fails.

---

## 1. Symptoms and Primary Causes

- **Templates not applying** — Templater misbinding, missing command file, or plugin disabled.
- **Wrong class generated** — filename pattern mismatch or stale template cache.
- **Plugin not responding** — plugin folder corrupted or manifest mismatch.
- **Hotkeys not firing** — Layer‑42 binding drift or hotkeys.json conflict.
- **Notes not appearing in correct folder** — path resolution failure in command file.

---

## 2. Rapid Diagnostic Flow (RDF)

1. **Check Plugin Status**  
   - Settings → Community Plugins → Library Note Factory → Enabled  
   - If disabled → enable → retry.

2. **Validate Template Paths**  
   - `Library/Templates/Classes/` exists  
   - `Library/Templates/Commands/` exists  
   - No nested folders or renamed directories.

3. **Run Templater Debug Mode**  
   - Command Palette → Templater: Open Debug Console  
   - Create a note → observe errors.

4. **Check Filename Pattern**  
   - Ensure class templates use correct `class:` frontmatter.  
   - Ensure commands reference correct template.

5. **Check Hotkeys Layer**  
   - `.obsidian/hotkeys.json` → confirm no duplicate bindings.

6. **Check Plugin Logs**  
   - `.obsidian/plugins/library-note-factory/log.txt` (if present).

---

## 3. Failure Modes

- **FM‑01: Template Not Found**  
  Cause: renamed or moved template.  
  Fix: restore path.

- **FM‑02: Command Not Found**  
  Cause: Templater command file missing.  
  Fix: restore from Operators folder.

- **FM‑03: Plugin Load Failure**  
  Cause: manifest.json mismatch.  
  Fix: delete plugin folder → reinstall.

- **FM‑04: Drift in Hotkeys**  
  Cause: Obsidian update or plugin conflict.  
  Fix: reapply Layer‑42 binding map.

---

## 4. Verification Signal

A new Session note created via hotkey produces:

- correct filename  
- correct frontmatter  
- correct folder placement  
- correct UID injection

If all four are true → system stable.

---

## 5. Operator Notes

- Never edit templates directly in the plugin folder.  
- Never rename class templates without updating commands.  
- Keep Operators folder as the **source of truth**.
