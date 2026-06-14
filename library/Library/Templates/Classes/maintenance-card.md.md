# Maintenance Card — Library System

## Purpose
Define the recurring tasks required to keep the Library stable, fast, and drift‑free.

---

## 1. Daily Maintenance (2 minutes)

- Create a Session note for any architectural or operational decision  
- Ensure no orphaned notes exist in root  
- Verify plugin is active and commands resolve  

---

## 2. Weekly Maintenance (10 minutes)

- Review RFCs for unresolved decisions  
- Check Templates/Classes for accidental edits  
- Validate filename patterns  
- Confirm Commands match Templates  
- Run a test creation of each note class  

---

## 3. Monthly Maintenance (20 minutes)

- Review Operator documents for accuracy  
- Update version registry  
- Check plugin code for drift  
- Validate Templater logs for errors  
- Ensure Library structure matches bootstrap spec  

---

## 4. Quarterly Maintenance (45 minutes)

- Perform a full Library rebuild test using the Bootstrap Note  
- Validate all six note classes end‑to‑end  
- Review deprecated features  
- Evaluate whether a MINOR or MAJOR bump is required  

---

## 5. Annual Maintenance (1–2 hours)

- Full audit of:
  - Templates  
  - Commands  
  - Plugin  
  - Operators  
  - Directory structure  
- Archive old RFCs  
- Rebuild the Library from scratch in a sandbox vault  
- Produce a new “State of the Library” report  

---

## 6. Failure Modes

- **Template Drift** — fix immediately, bump PATCH  
- **Command Mismatch** — update command or template, bump PATCH  
- **Plugin Error** — fix and bump MINOR  
- **Structural Break** — requires MAJOR bump  

---

## 7. Verification Signal

The Library is healthy when:

- All commands generate correct notes  
- No errors appear in Templater logs  
- Plugin loads cleanly  
- Operator docs match system behavior  
- Version registry is current  

---

## 8. Operator Notes

- Maintenance is not optional — it is structural hygiene  
- Drift compounds; corrections must be immediate  
- The Library is a living system and must be treated as such  

---

## 9. Golden Rule

**If it isn’t maintained, it isn’t real.**
