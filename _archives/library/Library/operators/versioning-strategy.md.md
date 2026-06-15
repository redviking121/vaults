# Versioning Strategy — Library System

## Purpose
Define how the Library evolves without drift, regressions, or fragmentation.  
This strategy governs templates, commands, plugin code, and operator documents.

---

## 1. Version Format
Use semantic versioning with operational clarity:

MAJOR.MINOR.PATCH

- MAJOR — structural changes to classes, commands, or plugin architecture  
- MINOR — new features, new classes, new commands  
- PATCH — bug fixes, template corrections, filename pattern fixes  

Example: `1.3.2`

---

## 2. Version Anchors
The following components carry explicit version anchors:

- **Class Templates** (`Templates/Classes/`)  
- **Command Templates** (`Templates/Commands/`)  
- **Plugin Code** (`.obsidian/plugins/library-note-factory/`)  
- **Operator Documents** (`Library/Operators/`)  

Each anchor is declared at the top of the file:


---

## 3. Change Control Protocol

### Step 1 — Declare  
State the intended change in a Session note or RFC.

### Step 2 — Stabilize  
Verify the change does not break:
- filename patterns  
- Templater injection  
- plugin command routing  
- class identity  

### Step 3 — Propagate  
Update:
- template  
- command  
- plugin  
- operator docs  

### Step 4 — Commit  
Increment version number according to the change type.

---

## 4. Backward Compatibility Rules

- **Templates** must remain compatible with older notes unless a MAJOR version bump is declared.  
- **Commands** must not change signature without a MAJOR bump.  
- **Plugin** must maintain command names unless deprecated with notice.  
- **Operator Docs** must reflect the current version at all times.

---

## 5. Deprecation Protocol

1. Mark the feature as deprecated in the operator docs.  
2. Add a comment in the template or command:  
   `# DEPRECATED — remove in next MAJOR release`  
3. Remove only after one full MINOR cycle.

---

## 6. Release Checklist

- All templates validated  
- All commands tested  
- Plugin loads without error  
- Operator docs updated  
- Version incremented  
- Session note created documenting the release

---

## 7. Emergency Patch Protocol

For critical fixes:

- Apply patch  
- Increment PATCH  
- Document in Session note  
- No MINOR or MAJOR bump required  

---

## 8. Version Registry

Maintain a simple registry file:

`Library/Operators/version-registry.md`

Each entry:



