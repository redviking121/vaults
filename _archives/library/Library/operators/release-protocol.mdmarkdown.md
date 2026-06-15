# Release Protocol — Library System

## Purpose
Define the controlled process for releasing updates to the Library system, ensuring stability, reproducibility, and zero drift.

---

## 1. Preconditions

- All changes documented in Session notes.  
- Test Plan executed and passed.  
- No unresolved items in Troubleshooting Card.

---

## 2. Release Steps

### **Step 1 — Freeze State**
- Snapshot `Library/Templates/`  
- Snapshot `Library/Operators/`  
- Snapshot plugin folder

### **Step 2 — Version Bump**
- Update version in `versioning-strategy.md`  
- Update plugin manifest if needed

### **Step 3 — Apply Changes**
- Add/modify templates  
- Update commands  
- Update plugin code  
- Update hotkeys.json if required

### **Step 4 — Run Test Plan**
- Full TM‑01 → TM‑07  
- Log results

### **Step 5 — Publish**
- Commit to Ops‑Vault  
- Tag release  
- Add release notes to `Library/Operators/release-log.md`

### **Step 6 — Verify**
- Create one note of each class  
- Confirm routing, UID, and structure

---

## 3. Rollback Protocol

If failure detected:

1. Restore snapshots  
2. Re-run Test Plan  
3. Document failure in release-log  
4. Retry release

---

## 4. Operator Notes

- Never release without a freeze.  
- Never skip UID verification.  
- Keep release cadence slow and deliberate.
