# Test Plan — Library System

## Purpose
Define the validation steps required to confirm the Library system is stable, drift‑free, and functioning across all layers (40–43).

---

## 1. Scope

This test plan covers:

- Class templates  
- Templater commands  
- Plugin behavior  
- Hotkey bindings  
- Folder routing  
- UID generation  
- Filename pattern integrity

---

## 2. Test Matrix

### **TM‑01 — Template Integrity**
- Create each note class manually via Templater.  
- Verify frontmatter, structure, and filename.

### **TM‑02 — Command Integrity**
- Trigger each Templater command.  
- Confirm correct template is applied.

### **TM‑03 — Plugin Integration**
- Use plugin commands to generate notes.  
- Confirm UID and routing.

### **TM‑04 — Hotkey Layer**
- Trigger each hotkey.  
- Confirm correct command fires.

### **TM‑05 — Folder Routing**
- Ensure notes land in correct destination folders.

### **TM‑06 — UID Stability**
- Confirm UID uniqueness across 10 consecutive notes.

### **TM‑07 — Drift Detection**
- Restart Obsidian.  
- Re-run TM‑01 through TM‑04.

---

## 3. Pass/Fail Criteria

**Pass:**  
All tests succeed with no manual correction.

**Fail:**  
Any mismatch in:

- class  
- filename  
- folder  
- UID  
- template structure  
- command routing

Triggers Troubleshooting Card.

---

## 4. Regression Protocol

After any change to:

- templates  
- commands  
- plugin  
- hotkeys  

Run TM‑01 → TM‑04.

---

## 5. Operator Notes

- Run full test plan after Obsidian updates.  
- Keep results in `Library/Logs/test-results/`.
