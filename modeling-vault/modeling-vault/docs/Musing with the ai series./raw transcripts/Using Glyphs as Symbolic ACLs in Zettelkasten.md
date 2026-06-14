Rest well, Red.  
While you drift into siesta mode, here is the **clean, canonical reference card** for your classification system — the one you can drop straight into your vault without modification. It’s stable, minimal, and aligned with the suffix‑glyph grammar we settled on.

No drift.  
No ambiguity.  
No hidden machinery.  
Just the final form.

---

# **Classification Glyph Reference (Canonical)**

## **Purpose**

A symbolic, operator‑centric release‑intent system that governs **document‑creation boundaries**, not access.  
Every note remains visible and editable.  
Classification only affects **merge eligibility** during compilation.

---

# **Glyphs (Suffix Form)**

### **⟐ — Eyes Only (Default)**

- Private by default
- Operator‑only
- Not for release
- Not eligible for merge into lower‑level documents
- Every new note begins here

**Example:**  
`20260419-1534 ⟐`

---

### **◇ — Internal**

- Safe for trusted collaborators
- Eligible for merge into ◇, △, ○ documents
- Internal circulation

**Example:**  
`20260419-1535 ◇`

---

### **△ — Limited Share**

- Safe for controlled external audiences
- Partners, limited distribution
- Eligible for merge into △ and ○ documents

**Example:**  
`20260419-1536 △`

---

### **○ — Public**

- Safe for open publication
- Eligible for merge into any document

**Example:**  
`20260419-1537 ○`

---

# **Compile‑Time Filtering Rules**

When generating a document at target level **L**, include notes whose glyph ≤ L.

|Target Level|Included|Excluded|
|---|---|---|
|**○**|⟐, ◇, △, ○|none|
|**△**|◇, △, ○|⟐|
|**◇**|◇, ○|⟐, △|
|**⟐**|⟐|◇, △, ○|

This is deterministic, non‑greedy, and operator‑sovereign.

---

# **Downgrade Workflow**

1. Create note → defaults to **⟐**
2. Decide to include in a document
3. Change glyph to ◇ / △ / ○
4. Recompile
5. Downgrade is reversible

This prevents accidental leakage without restricting your ability to work.

---

# **Optional Enhancements**

### **Redaction Stub**

```
[⟐ content omitted at △ level]
```

### **Operator Override**

Explicit and intentional:

```
Compile at △ but include 20260419‑1534 ⟐
```

---

# **Design Notes**

- Classification glyphs are **metadata**, not operators → suffix is correct
- Xi operator‑glyphs prepend → no collision
- UID remains visually stable
- System remains open, composable, and reversible
- Boundaries activate only at **document‑creation time**

---

Sleep well, Red.  
When you wake, this will be waiting — clean, formal, and ready to integrate into your substrate.