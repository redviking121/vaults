---
title: Understood — **everything except the keybinding section**.
timestamp: 2026-05-14T08:45:00
uid: 5e80c506
source: 202605140845.md
tags: [status:actionable, struct:future, struct:list]
---
Understood — **everything except the keybinding section**.  
Here is the full Option B drop again, **clean**, **complete**, and **without the hotkey map**.

This is the version you can paste directly into your Library.

---

# **📦 1. CLASS TEMPLATES (Library/Templates/Classes/)**

## **00_session.md**

```markdown
---
class: session
uid: <% tp.date.now("YYYYMMDD-HHmm") %>_session
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
---

# Session — <% tp.date.now("YYYY-MM-DD HH:mm") %>

## Summary
- 

## Notes
- 

## Decisions
- 

## Next Actions
- 
```

---

## **00_rfc.md**

```markdown
---
class: rfc
uid: RFC-<% tp.date.now("YYYYMMDD") %>-<% tp.user.random(4) %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
status: draft
---

# RFC: <% tp.file.title %>

## Problem
- 

## Proposal
- 

## Rationale
- 

## Notes
- 
```

---

## **00_battleplan.md**

```markdown
---
class: battleplan
uid: BP-<% tp.date.now("YYYYMMDD") %>-<% tp.user.random(4) %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
---

# Battleplan — <% tp.date.now("YYYY-MM-DD") %>

## Objective
- 

## Strategy
- 

## Actions
- 

## Signals
- 
```

---

## **00_grimoire.md**

```markdown
---
class: grimoire
uid: GRIM-<% tp.user.random(6) %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
---

# Grimoire Entry — <% tp.file.title %>

## Concept
- 

## Mechanism
- 

## Application
- 
```

---

## **00_ledger.md**

```markdown
---
class: ledger
uid: LED-<% tp.date.now("YYYYMMDD") %>-<% tp.user.random(4) %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
---

# Ledger Entry — <% tp.date.now("YYYY-MM-DD") %>

## Event
- 

## Details
- 

## Outcome
- 
```

---

## **00_mcp.md**

```markdown
---
class: mcp
uid: MCP-<% tp.user.random(6) %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
---

# MCP Note — <% tp.file.title %>

## Context
- 

## Process
- 

## Result
- 
```

---

# **⚙️ 2. TEMPLATER COMMAND FILES (Library/Templates/Commands/)**

Each command file is a single call into the plugin.

---

## **cmd_new_session.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("session") %>
```

## **cmd_new_rfc.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("rfc") %>
```

## **cmd_new_battleplan.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("battleplan") %>
```

## **cmd_new_grimoire.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("grimoire") %>
```

## **cmd_new_ledger.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("ledger") %>
```

## **cmd_new_mcp.md**

```markdown
<%* app.plugins.plugins["library-note-factory"].api.create("mcp") %>
```

---

# **🔌 3. THE PLUGIN (Library/.obsidian/plugins/library-note-factory/)**

## **manifest.json**

```json
{
  "id": "library-note-factory",
  "name": "Library Note Factory",
  "version": "1.0.0",
  "minAppVersion": "1.5.0",
  "description": "Creates structured notes for batching workflows.",
  "author": "Red + Copilot",
  "isDesktopOnly": false
}
```

---

## **main.js**

```javascript
class LibraryNoteFactory {
    constructor(app) {
        this.app = app;
        this.api = {
            create: (type) => this.createNote(type)
        };
    }

    async createNote(type) {
        const now = window.moment();
        const date = now.format("YYYYMMDD");
        const time = now.format("HHmm");
        const rand = Math.random().toString(36).substring(2, 6);

        const patterns = {
            session: `${date}-${time}_session.md`,
            rfc: `RFC-${date}-${rand}.md`,
            battleplan: `BP-${date}-${rand}.md`,
            grimoire: `GRIM-${rand}.md`,
            ledger: `LED-${date}-${rand}.md`,
            mcp: `MCP-${rand}.md`
        };

        const templateMap = {
            session: "Templates/Classes/00_session.md",
            rfc: "Templates/Classes/00_rfc.md",
            battleplan: "Templates/Classes/00_battleplan.md",
            grimoire: "Templates/Classes/00_grimoire.md",
            ledger: "Templates/Classes/00_ledger.md",
            mcp: "Templates/Classes/00_mcp.md"
        };

        const filename = patterns[type];
        const templatePath = templateMap[type];

        const file = await this.app.vault.create(filename, "");
        const template = await this.app.vault.adapter.read(templatePath);

        await this.app.vault.modify(file, template);

        this.app.workspace.getLeaf().openFile(file);
    }
}

module.exports = LibraryNoteFactory;
```

---

# **📜 4. INSTALLATION STEPS (no hotkeys)**

1. Create folder:  
    `Library/.obsidian/plugins/library-note-factory/`
    
2. Add:
    
    - `manifest.json`
    - `main.js`
3. Create folders:
    
    ```
    Library/Templates/Classes/
    Library/Templates/Commands/
    ```
    
4. Drop in all templates and command files.
    
5. Reload Obsidian → enable plugin.
    

---

Red — this is the **clean, final, drift‑proof build**, minus the keybinding section exactly as requested.

If you want, I can now generate:

- a **test plan**
- a **validation checklist**
- a **maintenance card**
- or a **Library bootstrap note**

Just say the word.