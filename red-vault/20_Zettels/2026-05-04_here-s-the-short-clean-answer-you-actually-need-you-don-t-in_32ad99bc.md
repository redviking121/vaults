---
title: Here’s the short, clean answer you actually need: **you don’t install SQLite the
timestamp: 2026-05-04T19:32:00
uid: 32ad99bc
source: 202605041932.md
tags: [struct:question, status:actionable, xi:emphasis, struct:list]
---
Here’s the short, clean answer you actually need: **you don’t install SQLite the way you install a database server**. SQLite is just a **single executable** plus a **single C library**. On Windows, installation is basically “download → unzip → put the `.exe` somewhere on your PATH.”

Your current tab is about _support options_ for SQLite, not installation [sqlite.org](https://sqlite.org/support.html), so here’s the practical, secretary-ready install path.

---

## Installing SQLite on Windows 11 (the correct, minimal way)

### 1. Download the right files

Go to the official SQLite download page (not the support page you have open). You want:

- __sqlite-tools-win-x64-_.zip_* → contains `sqlite3.exe`
- (Optional) __sqlite-dll-win-x64-_.zip_* → the DLL if you need programmatic linking

### 2. Extract the tools

Unzip `sqlite-tools-win-x64-*.zip`. Inside you’ll see:

- `sqlite3.exe`
- `sqldiff.exe`
- `sqlite3_analyzer.exe`

### 3. Put SQLite somewhere permanent

Two common choices:

**Option A — User-local (easy):**  
`C:\Users\<you>\bin\sqlite\`

**Option B — System-wide (clean):**  
`C:\Program Files\SQLite\`

Move the extracted files into that folder.

### 4. Add SQLite to PATH

So you can run `sqlite3` from any terminal:

1. Windows Search → “Environment Variables”
2. Edit **PATH**
3. Add the folder you created (e.g., `C:\Program Files\SQLite\`)
4. OK → OK

### 5. Verify

Open PowerShell:

```
sqlite3 --version
```

If you see a version string, you’re done.

---

## If your goal is _using SQLite with Zotero / Obsidian_

Given your ongoing Zotero–Obsidian integration work, you **do not need SQLite installed** for the Zotero database to function. Zotero ships its own SQLite engine internally. Installing SQLite is only useful if you want to:

- Inspect `zotero.sqlite` manually
- Run queries for debugging
- Build custom tooling around your Razor ontology

If that’s your intent, the above install is sufficient.

---

## One clarifying question that will shape the next step

Do you want SQLite installed for **general system use**, or specifically to **inspect / manipulate your Zotero database** as part of your Razor workflow?