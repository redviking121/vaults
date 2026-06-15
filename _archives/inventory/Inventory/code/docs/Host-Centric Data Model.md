Red —  
here is the **host‑centric data model** expressed in the same operator‑stance geometry as the rest of the substrate.  
This is the _canonical_ model: the host is the **root object**, everything else is a **projection** or **derivative surface**.

Every major surface begins with a Guided Link, as required.

---

# ⭐ Host‑Centric Data Model

_(operator‑grade, DR‑ready, substrate‑clean)_

The invariant:  
**The host is the only primary object.**  
Everything else — snapshots, scans, packages, diffs — is _downstream_ of the host.

---

## 🟥 Root Object: **Host**

The host is the anchor for all workflows.

**Identity fields (stable):**

- `host_id` — UUIDv4
- `hostname` — system hostname
- `fqdn` — fully qualified domain name
- `os` — distro, version, kernel
- `arch` — x86_64, arm64, etc.
- `roles` — operator‑assigned tags (db, web, workstation, etc.)

**Dynamic fields (mutable):**

- `last_scan` — timestamp
- `drift_state` — clean | drifted | unknown
- `health` — nominal | degraded | critical

**Relations:**

- `snapshots[]`
- `packages[]`
- `services[]`
- `filesystems[]`
- `drift_reports[]`

---

## 🟦 Secondary Object: **Snapshot**

A snapshot is a **point‑in‑time capture** of the host’s state.

**Fields:**

- `snapshot_id` — UUID
- `host_id` — FK
- `timestamp`
- `package_set_hash` — deterministic hash of package list
- `service_set_hash`
- `filesystem_hash`
- `notes` — operator annotations

**Purpose:**

- DR baseline
- Diff anchor
- Audit trail
- Reconciliation target

---

## 🟩 Package Object: **Package**

Represents a single installed package on the host.

**Fields:**

- `name`
- `version`
- `arch`
- `source` — repo, local, custom
- `files[]` — file paths owned by package
- `signature` — optional cryptographic metadata
- `status` — installed | removed | upgraded | orphaned

**Relations:**

- belongs to `host`
- may belong to `snapshot` (historical)

---

## 🟧 Service Object: **Service**

Represents a systemd (or equivalent) service.

**Fields:**

- `name`
- `state` — active | inactive | failed
- `enabled` — bool
- `unit_file` — path
- `dependencies[]`
- `logs_ref` — pointer to log index

---

## 🟪 Filesystem Object: **Filesystem**

Represents a mount or logical filesystem.

**Fields:**

- `mount_point`
- `device`
- `fstype`
- `size_bytes`
- `used_bytes`
- `inode_usage`
- `flags` — ro, nosuid, etc.

---

## 🟫 Drift Report Object: **DriftReport**

Represents the difference between **host reality** and **snapshot baseline**.

**Fields:**

- `report_id`
- `host_id`
- `snapshot_id`
- `timestamp`
- `package_drift[]` — added/removed/changed
- `service_drift[]`
- `filesystem_drift[]`
- `severity` — low | medium | high | critical
- `actions[]` — operator‑recorded remediation steps

---

# ⭐ Canonical Relationships

_(this is the real geometry)_

```
Host
 ├── Snapshots[]
 │     └── PackageSet / ServiceSet / FilesystemState
 ├── Packages[]
 ├── Services[]
 ├── Filesystems[]
 └── DriftReports[]
```

The **host** is the only object that exists independently.  
Everything else is a **temporal projection** or **state derivative**.

---

# ⭐ Operator‑Grade Invariants

These are the rules that keep the model clean and DR‑safe.

- **Host is the root.** No orphan snapshots, no free‑floating package sets.
- **Snapshots are immutable.** Once written, they never change.
- **Drift is always relative to a snapshot.**
- **Package sets are deterministic.** Hashes guarantee reproducibility.
- **Services are stateful, not structural.**
- **Filesystem is structural, not stateful.**
- **No circular references.** Host → Snapshot → State only.

---

# ⭐ What you can open next

- **Host‑first scanner architecture**
- **DR manifest generator**
- **Package diff engine**
- **Wire this model into the TUI panes**

Which surface do you want to activate, Red?