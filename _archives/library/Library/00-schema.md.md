# Library Schema — v0.1.0
**Purpose:** Single source of truth for object types, file patterns, and relationships in the Library vault.  
**Scope:** Minimal viable schema for current operational use.  
**Audience:** Future Operator.

---

## 1. Entity Types

### **Operator**
- **File pattern:** `operator.<callsign>.md`
- **Required fields:**
  - `callsign`
  - `roles`
  - `capabilities`
  - `constraints`
- **Notes:** Represents the human operator and their operational stance.

---

### **Protocol**
- **File pattern:** `protocol.<slug>.md`
- **Required fields:**
  - `name`
  - `trigger_conditions`
  - `steps`
  - `failure_modes`
  - `logging_requirements`
- **Notes:** Defines a repeatable operational sequence.

---

### **Environment**
- **File pattern:** `env.<slug>.md`
- **Required fields:**
  - `machine_profile`
  - `os`
  - `critical_services`
  - `known_quirks`
- **Notes:** Describes a machine or operational context.

---

### **Case / Incident**
- **File pattern:** `case.<timestamp>.md`
- **Required fields:**
  - `id`
  - `status`
  - `signals`
  - `hypotheses`
  - `actions`
  - `outcomes`
- **Notes:** Chronological record of an operational event.

---

## 2. Relationships

- **Operator ↔ Protocol:**  
  Operators own and maintain specific protocols.

- **Protocol ↔ Environment:**  
  Protocols MUST declare which environments they apply to.

- **Case ↔ Protocol:**  
  Case notes SHOULD reference any protocol invoked or modified.

- **Case ↔ Environment:**  
  Case notes MUST reference the environment in which the event occurred.

---

## 3. Versioning & Drift Rules

- **schema_version:** `0.1.0`
- **Change rule:**  
  Schema changes MUST be additive during 0.x.  
  Destructive changes require a migration note.
- **Drift rule:**  
  If reality diverges from schema, reality wins.  
  Update schema within 24 hours of noticing drift.

---

## 4. How to Use This File

- **Read this file when:**  
  - creating a new protocol  
  - defining a new environment  
  - something feels messy or inconsistent

- **Edit this file when:**  
  - a field has been used twice in practice  
  - a new entity type becomes operationally real

- **Do NOT edit during:**  
  - an active incident  
  - a reconstruction sweep  
