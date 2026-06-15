## 4. **surfaces/sidecar.py** — right pane

The **reasoning sidecar** / metadata inspector.

**Responsibilities:**

- Render metadata, diffs, diagnostics, drift markers
    
- Show contradictions or anomalies
    
- Provide contextual augmentation without contaminating the center pane
    

**Does NOT:**

- Modify host state
    
- Trigger scans
    
- Own any primary data
    

This is your **Xi Razor** pane.