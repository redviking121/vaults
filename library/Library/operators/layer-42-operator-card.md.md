# Layer‑42 Operator Card — Intent‑to‑Action Binding Doctrine

## Purpose
Define the translation layer between operator intent and system behavior.  
Layer‑42 ensures that every action triggered by the operator is:
- unambiguous  
- atomic  
- reversible  
- predictable  
- voltage‑safe  

This layer governs how human intent becomes plugin commands, keybindings, and automation triggers.

---

## 1. Operator Intent Model

### 1.1 Intent Categories
All operator actions fall into one of four categories:

- **Create** — generate a new artifact (note, template instance, report)
- **Transform** — modify an existing artifact in a controlled way
- **Navigate** — move through the Library without altering state
- **Inspect** — reveal metadata, structure, or system status

Each command must declare its category explicitly.

### 1.2 Intent Purity
A command must do **exactly one thing**.  
No hidden side effects.  
No implicit writes.  
No multi‑intent blending.

If an action appears to require two intents, it becomes two commands.

---

## 2. Action Binding Rules

### 2.1 One‑to‑One Doctrine
Every operator‑facing action must map:

**1 operator intent → 1 system command → 1 observable effect**

No multiplexing.  
No “smart” behavior that guesses.

### 2.2 Deterministic Outcomes
Given the same state and the same input, the system must produce the same output.  
No randomness.  
No context‑dependent surprises.

### 2.3 Reversibility Requirement
Every action must define:

- its forward operation  
- its reverse operation  
- its safe‑abort condition  

If an action cannot be reversed, it must be explicitly marked **irreversible** and require operator confirmation.

---

## 3. Keybinding Doctrine

### 3.1 Voltage‑Safe Keys
A keybinding must never trigger:
- multi‑step workflows  
- destructive actions  
- ambiguous operations  

Keybindings are for **fast, safe, atomic** actions only.

### 3.2 Namespace Rules
Bindings must follow the namespace:

`L42/<intent>/<action>`

Examples:
- `L42/create/note`
- `L42/transform/retitle`
- `L42/navigate/back`
- `L42/inspect/metadata`

### 3.3 No Overloading
A keybinding cannot change behavior based on:
- cursor position  
- selection state  
- active pane  
- time of day  
- plugin mood  

One key → one action.

---

## 4. Plugin Command Integration

### 4.1 Command Declaration Contract
Every plugin command must declare:

- intent category  
- action name  
- required inputs  
- expected outputs  
- failure modes  
- reversibility  

### 4.2 Command Purity
Commands must not:
- write to multiple notes  
- modify global state  
- spawn background tasks without supervision  

### 4.3 Command Visibility
All commands must be listed in the Layer‑43 Command Map.  
No hidden verbs.

---

## 5. Safety Envelope

### 5.1 Abort Conditions
Every action must define:
- when it should stop  
- how it should stop  
- how to leave the system in a clean state  

### 5.2 Voltage‑Safe Execution
Actions must be:
- atomic  
- isolated  
- state‑consistent  

If an action cannot guarantee atomicity, it must be routed through the Batching Protocol.

---

## 6. Operator Guarantees

Layer‑42 guarantees that:

- the system never misinterprets operator intent  
- every action is predictable  
- every action is reversible or explicitly marked  
- the plugin behaves like a cockpit, not a puzzle  
- the Library remains drift‑free under operator load  

---

## 7. Versioning
This card is governed by the Versioning Strategy.  
Changes require:
- operator review  
- compatibility check  
- update to Layer‑43  
- update to the Release Protocol  

