---
title: # Xanadu Node v0.1 – Mini RFC
timestamp: 2026-05-14T08:37:00
uid: d980cef4
source: 202605140837.md
tags: [struct:question, status:actionable, struct:list]
---
# Xanadu Node v0.1 – Mini RFC

This is a working-spec for a single “Xanadu Node” instance: how it exposes an API, how agents are represented, and how they coordinate around tasks and memory. Target: something you can actually wire up with a thin implementation layer (Python/Node/whatever) and iterate.

---

## 1. Scope and goals

**Goal:** Define the minimal contracts so that:

- **Clients** (CLI, TUI, Obsidian/Logseq plugin, web UI) can talk to a node.
- **Agents** can be declared as data (profiles) and executed as behavior.
- **Tasks** can be created, updated, and observed.
- **Memory** and **artifacts** can be stored and retrieved in a consistent way.

**Non-goals (for v0.1):**

- Multi-node routing / federation.
- Complex auth / multi-tenant.
- Tool/plugin marketplace.
- Full-blown workflow engine.

---

## 2. Core concepts

- **Node:** A single runtime exposing an HTTP (or local IPC) API.
- **Agent:** A named configuration + behavior profile that can be invoked on tasks.
- **Task:** A unit of work with lifecycle, inputs, outputs, and logs.
- **Memory:** Long-lived storage of facts, notes, embeddings, and artifacts.
- **Tool:** A callable capability (e.g., “search vault”, “run shell command”, “call LLM”).

---

## 3. Node API surface (v0.1)

Assume HTTP+JSON, versioned under `/v0`.

### 3.1 Authentication

For v0.1, optional simple token:

- **Header:** `X-Xanadu-Token: <token>`
- If token is not configured, node runs open on localhost.

### 3.2 Endpoints overview

|Area|Method/Path|Purpose|
|---|---|---|
|Health|`GET /v0/health`|Liveness & basic config|
|Agents|`GET /v0/agents`|List agent profiles|
||`GET /v0/agents/{id}`|Get agent profile|
||`POST /v0/agents`|Create/update agent profile|
|Tasks|`POST /v0/tasks`|Create a task|
||`GET /v0/tasks/{id}`|Get task status + result|
||`POST /v0/tasks/{id}/cancel`|Request cancellation|
|Memory|`POST /v0/memory/notes`|Store a note|
||`GET /v0/memory/notes`|Query notes|
||`POST /v0/memory/facts`|Store a structured fact|
||`GET /v0/memory/facts`|Query facts|
|Tools|`GET /v0/tools`|List tools exposed by node|

You can implement a subset and still be “v0.1-compliant” if the contracts are respected.

---

## 4. Data models

### 4.1 Agent profile

**Path:** `GET/POST /v0/agents`  
**Type:** `AgentProfile`

```json
{
  "id": "research-analyst-1",
  "name": "Research Analyst",
  "version": "0.1.0",
  "role": "Analyst",
  "description": "Decomposes research questions, queries local knowledge, and produces structured briefs.",
  "capabilities": {
    "can_read_memory": true,
    "can_write_memory": true,
    "can_use_tools": ["vault.search", "web.search", "summarize.text"]
  },
  "constraints": {
    "max_tokens": 4096,
    "max_steps": 12,
    "allowed_domains": ["local-vault", "user-provided-docs"]
  },
  "prompting": {
    "system_prompt": "You are a research analyst. You decompose questions, search available materials, and produce concise, sourced briefs.",
    "style_guide": {
      "tone": "operator-grade, concise, explicit assumptions",
      "format": "markdown",
      "sections": ["Summary", "Findings", "Sources", "Open Questions"]
    }
  },
  "planning": {
    "enabled": true,
    "default_plan_template": [
      "Clarify the question and constraints.",
      "Identify relevant materials in memory/tools.",
      "Draft a structured answer.",
      "Refine and compress."
    ]
  },
  "metadata": {
    "created_at": "2026-05-05T18:00:00Z",
    "tags": ["research", "analysis", "default"]
  }
}
```

**Notes:**

- **`id`** is stable and used in task creation.
- **`capabilities.can_use_tools`** is a whitelist for tool routing.
- **`prompting`** is declarative; implementation decides how to map to LLM calls.

### 4.2 Task

**Path:** `POST /v0/tasks`  
**Type:** `Task`

#### 4.2.1 Create task – request

```json
{
  "agent_id": "research-analyst-1",
  "input": {
    "type": "research_query",
    "payload": {
      "query": "Map out the key design patterns for local-first research engines similar to Xanadu.",
      "constraints": {
        "max_read_time_minutes": 10,
        "focus": ["architecture", "memory models"]
      }
    }
  },
  "context": {
    "memory_scope": ["vault:project-xanadu"],
    "user": {
      "id": "red",
      "display_name": "Red"
    }
  },
  "execution": {
    "mode": "async",
    "priority": "normal"
  }
}
```

#### 4.2.2 Task representation – response

```json
{
  "id": "task_01HXYZ...",
  "agent_id": "research-analyst-1",
  "status": "queued",
  "created_at": "2026-05-05T18:02:00Z",
  "updated_at": "2026-05-05T18:02:00Z"
}
```

#### 4.2.3 Task status/result

**Path:** `GET /v0/tasks/{id}`

```json
{
  "id": "task_01HXYZ...",
  "agent_id": "research-analyst-1",
  "status": "completed",
  "created_at": "2026-05-05T18:02:00Z",
  "updated_at": "2026-05-05T18:05:30Z",
  "logs": [
    {
      "ts": "2026-05-05T18:02:05Z",
      "level": "info",
      "message": "Parsed query and constraints."
    },
    {
      "ts": "2026-05-05T18:02:10Z",
      "level": "info",
      "message": "Queried memory scope vault:project-xanadu."
    }
  ],
  "output": {
    "type": "markdown_brief",
    "payload": {
      "content": "## Summary\n...\n",
      "artifacts": [
        {
          "id": "artifact_01HABC...",
          "kind": "note",
          "location": "vault:project-xanadu/briefs/local-first-patterns.md"
        }
      ]
    }
  }
}
```

### 4.3 Memory

#### 4.3.1 Notes

**Store note – `POST /v0/memory/notes`**

```json
{
  "title": "Local-first research engine patterns",
  "content": "Markdown or plain text...",
  "tags": ["xanadu", "architecture"],
  "scope": "vault:project-xanadu",
  "metadata": {
    "source": "agent:research-analyst-1",
    "task_id": "task_01HXYZ..."
  }
}
```

**Query notes – `GET /v0/memory/notes?scope=vault:project-xanadu&tag=xanadu&query=local-first`**

Response:

```json
{
  "results": [
    {
      "id": "note_01HDEF...",
      "title": "Local-first research engine patterns",
      "snippet": "...",
      "scope": "vault:project-xanadu",
      "tags": ["xanadu", "architecture"]
    }
  ]
}
```

#### 4.3.2 Facts

**Store fact – `POST /v0/memory/facts`**

```json
{
  "subject": "xanadu.node.api",
  "predicate": "supports_endpoint",
  "object": "/v0/tasks",
  "confidence": 0.9,
  "metadata": {
    "source": "spec",
    "created_by": "red"
  }
}
```

**Query facts – `GET /v0/memory/facts?subject=xanadu.node.api`**

---

## 5. First agent profile: “Research Analyst v0.1”

This is the concrete v0.1 agent we’ll treat as canonical.

### 5.1 Identity

- **id:** `research-analyst-1`
- **name:** `Research Analyst`
- **role:** `Analyst`
- **version:** `0.1.0`
- **description:** Decomposes questions, queries local knowledge, and produces operator-grade briefs.

### 5.2 Capabilities

- **can_read_memory:** `true`
- **can_write_memory:** `true`
- **can_use_tools:**
    - `vault.search` – search notes by text/tags/scope.
    - `vault.read` – fetch full note content.
    - `vault.write` – create/update notes.
    - `summarize.text` – LLM summarization.
    - (Optional) `web.search` – if you want external reach.

### 5.3 Constraints

- **max_tokens:** `4096` (per LLM call).
- **max_steps:** `12` (planning iterations/tool calls).
- **allowed_scopes:** `["vault:project-xanadu", "vault:global-research"]`.

### 5.4 Prompting contract

**System prompt (core):**

> You are a research analyst for a local-first knowledge system called Xanadu.  
> Your job is to:
> 
> - Decompose the user’s question into sub-questions when helpful.
> - Search available materials (memory, tools) before speculating.
> - Produce concise, operator-grade briefs in markdown.
> - Make assumptions explicit and label speculation clearly.
> - Prefer structure over prose when possible.

**Style guide:**

- **Tone:** concise, explicit, non-fluffy.
- **Format:** markdown with the following sections when applicable:
    - `## Summary`
    - `## Findings`
    - `## Sources`
    - `## Open Questions`

### 5.5 Planning behavior (pseudo)

1. **Clarify:**
    - If the query is ambiguous, generate 1–3 clarifying questions.
2. **Scan memory:**
    - Call `vault.search` with key terms.
    - For top N hits, call `vault.read`.
3. **Synthesize:**
    - Use `summarize.text` on relevant chunks.
    - Draft `Summary` and `Findings`.
4. **Ground sources:**
    - List note IDs/paths in `Sources`.
5. **Emit artifacts:**
    - Optionally write a new note via `vault.write` with the brief.

Implementation can treat this as a simple loop over “steps” with tool calls.

---

## 6. Implementable checklist (v0.1)

Here’s the concrete “do this in order” list to get a working Xanadu Node v0.1.

### 6.1 Node skeleton

- **Define:**
    - **`/v0/health`** returning:
        - `status: "ok"`
        - `version: "0.1.0"`
        - `node_id` (random UUID or configured)
- **Wire:** HTTP server (Express/Fastify/whatever) with JSON body parsing.
- **Config:**
    - Optional `XANADU_TOKEN` for auth; if set, enforce header.

### 6.2 Data models and storage

- **Implement models:**
    - **AgentProfile** (in-memory JSON or simple file-backed store).
    - **Task** (in-memory with optional persistence).
    - **Note** and **Fact** (backed by filesystem or simple DB).
- **Choose storage:**
    - Minimal: filesystem + JSON index.
    - Slightly nicer: SQLite with tables `agents`, `tasks`, `notes`, `facts`.

### 6.3 Agent endpoints

- **`GET /v0/agents`**
    
    - Return list of `AgentProfile` objects.
- **`GET /v0/agents/{id}`**
    
    - Return single profile or 404.
- **`POST /v0/agents`**
    
    - Upsert by `id`.
    - Validate required fields (`id`, `name`, `prompting.system_prompt`).
- **Seed:**
    
    - On startup, load default `research-analyst-1` profile from a JSON file.

### 6.4 Task execution loop

- **`POST /v0/tasks`**
    - Validate `agent_id` exists.
    - Create `Task` with `status: "queued"`.
- **Background worker:**
    - Poll queued tasks.
    - For each:
        - Load agent profile.
        - Run agent logic (hard-coded for v0.1) using:
            - LLM client (e.g., local model or API).
            - Tool adapters (`vault.search`, `vault.read`, `vault.write`).
        - Update `logs` as steps progress.
        - Write `output` when done; set `status: "completed"` or `"failed"`.
- **`GET /v0/tasks/{id}`**
    - Return full task object.
- **`POST /v0/tasks/{id}/cancel`**
    - Mark as `cancelling`; worker checks and aborts if possible.

### 6.5 Memory endpoints

- **Notes:**
    
    - `POST /v0/memory/notes` → create note, return `id`.
    - `GET /v0/memory/notes` → filter by `scope`, `tag`, `query` (simple full-text or substring).
- **Facts:**
    
    - `POST /v0/memory/facts` → append fact.
    - `GET /v0/memory/facts` → filter by `subject`, `predicate`, `object`.
- **Tool adapters:**
    
    - Implement `vault.search` as a thin wrapper around `GET /v0/memory/notes`.
    - Implement `vault.read` as “get note by id”.
    - Implement `vault.write` as `POST /v0/memory/notes`.

### 6.6 First agent wiring

- **Hard-code or load `research-analyst-1`** with the profile above.
- **Implement agent loop:**
    - For v0.1, a single-pass flow is enough:
        1. Call `vault.search` with query terms.
        2. Fetch top notes.
        3. Call LLM once with:
            - System prompt from profile.
            - User query.
            - Selected note contents.
        4. Store result as:
            - `task.output.payload.content` (markdown).
            - Optional new note via `vault.write`.
- **Log steps** into `task.logs`.

---

If you like this shape, next pass we can either:

- tighten the JSON schemas into something you can drop into a codebase, or
- design the “tool adapter” interface between the agent loop and the node (so you can swap in different backends cleanly).

What’s the first implementation target you’re leaning toward—Node/TypeScript, Python, or something else?