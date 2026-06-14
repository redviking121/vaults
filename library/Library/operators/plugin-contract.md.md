# Library Note Factory — Plugin Contract  
Version: 1.0.0  
Status: Authoritative

---

## Purpose

Define the **authoritative contract** for the Library Note Factory plugin:

- **Scope:** What the plugin is allowed to do.
- **Interface:** What Layer‑42 and Layer‑43 can rely on.
- **Membranes:** How it interacts with Templater and the Library.
- **Stability:** What must not change without a versioned contract update.

This document governs implementation, refactors, and future extensions.

---

## Scope of authority

The plugin has **narrow, explicit authority**:

- **File creation:**  
  Create new Library notes for known classes using stable filename patterns.

- **Command surface:**  
  Expose one Layer‑43 command per Library class (plus core ops).

- **Metadata handoff:**  
  Attach class metadata and parameters for downstream tools (e.g., Templater).

- **Event emission:**  
  Emit structured events for invocation, success, and failure.

The plugin **does not** own content, taxonomy, or semantic meaning. It is a **factory and router**, not an author.

---

## Interfaces and membranes

### Layer‑42 ↔ Plugin (intent binding)

- **Input:**  
  - **Intent ID:** `l42.intent.<domain>.<verb>`  
  - **Parameters:** `{ classId, title?, tags?, parentPath?, correlationId? }`

- **Behavior:**  
  - Resolve intent to a **Library class** and **Layer‑43 command**.
  - Invoke the corresponding Layer‑43 command with parameters.
  - Emit `L43.CMD.<id>.INVOKED` with correlation metadata.

- **Guarantee:**  
  - Every supported Library class has a **stable mapping** from Layer‑42 intent → Layer‑43 command → file creation behavior.

---

### Layer‑43 ↔ Plugin (command membrane)

- **Command IDs:**  
  `l43.library.<classId>.new` (e.g., `l43.library.session.new`, `l43.library.rfc.new`)

- **Command responsibilities:**
  - Validate parameters (title, path, options).
  - Compute filename and target path.
  - Create the file (or fail cleanly).
  - Attach metadata payload for Templater.
  - Emit structured events.

- **Event schema:**
  - `L43.CMD.<ID>.INVOKED`
  - `L43.CMD.<ID>.RESULT.OK`
  - `L43.CMD.<ID>.RESULT.ERROR`

---

### Plugin ↔ Templater (template contract)

- **Trigger model:**
  - Plugin creates the file.
  - Plugin invokes a **single Templater command** with a payload.
  - Templater is responsible for injecting content.

- **Payload (minimum):**
  - `classId` — Library class identifier (e.g., `session`, `rfc`, `brief`).
  - `templateId` — Templater template key.
  - `filePath` — Full path of the created file.
  - `title` — Human‑readable title.
  - `createdAt` — ISO timestamp.
  - `correlationId` — For tracing across layers.
  - `options` — Class‑specific options (optional, structured).

- **Guarantees:**
  - Payload shape is **backwards compatible** across plugin versions.
  - New fields are **additive** and **optional**.
  - Removal or renaming of fields
