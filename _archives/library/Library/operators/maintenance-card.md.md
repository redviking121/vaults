# Maintenance Card — Library System

## Purpose
Define the recurring tasks that keep the Library system stable, drift‑free, and operational over long time horizons.  
This card is used during routine maintenance cycles or after major changes.

---

## Daily Tasks
- Verify that new notes were created using the correct class templates.  
- Check for orphaned notes in `Library/` root.  
- Confirm plugin commands executed without error.  
- Review `today.md` for any anomalies or drift signals.

---

## Weekly Tasks
- Run the full Test Plan.  
- Validate template integrity in `Library/Templates/Classes/`.  
- Confirm Templater commands match filename patterns.  
- Inspect plugin logs for warnings or slowdowns.

---

## Monthly Tasks
- Review the Operator Index for completeness.  
- Regenerate the State of the Library Report.  
- Validate cross‑links between Operators and Templates.  
- Confirm no deprecated templates remain in the system.

---

## Quarterly Tasks
- Perform a full Library audit: structure, naming, class adherence.  
- Review version history and apply the Release Protocol for updates.  
- Rebuild the plugin if dependencies or Obsidian versions changed.  
- Validate batching behavior under load.

---

## Annual Tasks
- Re‑run the bootstrap procedure in a clean environment to ensure reproducibility.  
- Archive old reports and logs.  
- Review the architecture for potential simplification or modernization.

---

## Failure Modes
- Template drift  
- Plugin command mismatch  
- Broken filename patterns  
- Stale or missing Operator documents  
- Cross‑link failures  
- Batching anomalies

---

## Verification Signals
- All commands execute without error  
- All templates match their class specification  
- Plugin contract remains intact  
- No orphaned notes  
- No drift detected in weekly or monthly checks

---

## Operator Notes
Maintenance is not optional.  
It is the discipline that keeps the Library alive.

**Golden Rule:**  
If something feels off, run the Test Plan before touching anything else.
