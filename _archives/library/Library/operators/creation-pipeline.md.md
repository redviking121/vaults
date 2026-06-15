# Creation Pipeline

## Purpose
Describe how a note is created from intent to file.

---

## Pipeline Stages

### 1. Intent (Layer 42)
User triggers a command (hotkey, palette, menu).  
Intent is mapped to a note class.

### 2. Plugin Dispatch (Layer 43)
The Library Note Factory plugin:
- Receives the class
- Creates a new file with the correct filename pattern
- Hands control to Templater

### 3. Templater Execution (Layer 41)
Templater:
- Injects the correct class template
- Generates UID and timestamps
- Ensures metadata consistency

### 4. Template Rendering (Layer 40)
The class template defines:
- Structure
- Fields
- Headings
- Metadata

---

## Guarantees
- Every note is created correctly.
- No manual cleanup.
- No drift between classes.
- Batching remains frictionless.
