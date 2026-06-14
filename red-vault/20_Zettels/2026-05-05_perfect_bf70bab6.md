---
title: Perfect.
timestamp: 2026-05-05T01:05:00
uid: bf70bab6
source: 202605050105.md
tags: [status:actionable, struct:list]
---
Perfect.  
Then we shift into **operator‑grade design mode** and produce the **Ingestion Daemon Design Document v1.0** — the artifact that makes the system _legible_, _reviewable_, and _implementable_.

Below is the clean, structured, field‑manual version.  
This is the doc you’d hand to another engineer and they’d know exactly what to build.

---

# **INGESTION DAEMON — DESIGN DOCUMENT v1.0 (Operator Grade)**

## **0. Purpose**

The Ingestion Daemon is a **persistent background process** that:

- watches all log‑emitting surfaces
- normalizes and classifies events
- applies metadata and session routing
- forwards structured entries into the Academy

Its job is to make the environment **self‑documenting** with zero operator friction.

---

## **1. System Overview**

The daemon is a **three‑stage pipeline**:

1. **Watchers** — detect new events
2. **Transforms** — normalize, classify, enrich
3. **Sinks** — deliver structured logs to the Academy

Each stage is modular, reversible, and independently testable.

---

## **2. Ingestion Sources (Watchers)**

### **2.1 Terminal Watcher**

Monitors:

- shell commands
- command output
- operator annotations (`# note:` style)

Mechanism:

- `PROMPT_COMMAND` hook
- optional `script` wrapper
- optional PTY tap

Output format: raw text + timestamp + TTY metadata.

---

### **2.2 WebUI Watcher**

Monitors:

- user prompts
- model responses
- tool events
- session transitions

Mechanism:

- WebUI event stream
- local API hook
- optional websocket listener

Output format: JSON event objects.

---

### **2.3 System Watcher**

Monitors:

- systemd unit logs
- daemon logs
- service failures
- resource warnings

Mechanism:

- `journalctl --follow`
- unit‑specific watchers

Output format: structured journal entries.

---

## **3. Transform Layer**

### **3.1 Normalization**

Convert all incoming events into a unified schema:

```
{
  "timestamp": ISO8601,
  "source": "terminal|webui|system",
  "session": <session-id>,
  "type": <event-type>,
  "payload": <raw-or-structured>,
  "metadata": { ... }
}
```

### **3.2 Classification**

Rules:

- Terminal commands → `cmd.exec`
- Terminal output → `cmd.output`
- WebUI prompt → `ui.prompt`
- WebUI response → `ui.response`
- Systemd event → `sys.event`

### **3.3 Enrichment**

Add:

- session ID (from Naming Protocol)
- vector ID
- severity
- tags
- operator annotations

### **3.4 Chunking**

Large payloads (e.g., long model responses) are chunked with:

- deterministic boundaries
- stable chunk IDs
- reassembly metadata

---

## **4. Routing Layer (Sinks)**

### **4.1 Local Sink**

Writes to:

- `~/.academy/logs/<session>/<date>.jsonl`
- atomic append
- fsync on critical events

### **4.2 Remote Sink (optional)**

Push to:

- local vector DB
- remote store
- message queue

### **4.3 Backpressure & Retry**

- exponential backoff
- idempotent writes
- journal replay on restart

---

## **5. Daemon Architecture**

### **5.1 Process Model**

- single supervisor process
- three watcher threads
- one transform worker pool
- one sink dispatcher

### **5.2 State**

- in‑memory queue
- persistent journal for crash recovery
- monotonic event counter

### **5.3 Configuration**

YAML or TOML:

- enabled watchers
- sink targets
- classification rules
- session mapping

### **5.4 Health & Telemetry**

- heartbeat log every 60s
- queue depth
- last successful write
- watcher status

---

## **6. Failure Modes & Safeties**

### **6.1 Watcher Failure**

- auto‑restart
- log to systemd
- escalate if repeated

### **6.2 Transform Failure**

- quarantine malformed event
- continue pipeline

### **6.3 Sink Failure**

- queue events
- retry with backoff
- failover to local sink

---

## **7. Implementation Plan**

### **Phase 1 — Minimal Viable Daemon**

- terminal watcher
- transform pipeline
- local sink
- session tagging

### **Phase 2 — WebUI Integration**

- WebUI event listener
- prompt/response classification

### **Phase 3 — System Integration**

- systemd watcher
- health telemetry

### **Phase 4 — Hardening**

- journaling
- backoff
- idempotency
- config system

---

## **8. Deliverables**

- `ingestd.py` (daemon)
- `ingestctl` (control CLI)
- config file
- systemd unit file
- operator manual

---

## **9. Success Criteria**

The daemon is considered operational when:

- all three watchers run continuously
- logs are normalized and session‑routed
- no operator action is required
- the Academy becomes a complete historical record of all activity

---

Red — this is the full design doc.  
If you want, we can now move to **B) implement the minimal daemon** using this spec as the blueprint.

Just say **“build it”** and we’ll drop into code.