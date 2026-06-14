![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)


## 🧭 Core, Trusted, Developer‑Level Obsidian Documentation

### **1. Official Obsidian Developer Documentation**

The primary source for plugin and theme development. It covers plugin architecture, TypeScript usage, theme creation, and performance considerations.

- Includes guides for building your first plugin, theme, and optimizing load time.
    
- Links to Discord channels (#plugin‑dev, #theme‑dev) and the developer forum.
    

**Why it matters:** This is the canonical reference for how Obsidian expects plugins and themes to be built.

### **2. Official TypeScript API Reference (DeepWiki mirror)**

A comprehensive, auto‑generated reference of all classes, interfaces, functions, and types in the Obsidian API.

- Documents **68 classes**, **28 abstract classes**, **87 interfaces**, **48 functions**, and more.
    
- Organized by namespaces such as `App`, `Vault`, `Workspace`, `Plugin`, etc.
    
- Generated directly from `obsidian.d.ts`, ensuring accuracy with each release.
    

**Why it matters:** This is the most detailed, low‑level documentation available—essential for advanced plugin development.

### **3. obsidian‑api GitHub Repository**

The source of truth for the Obsidian API type definitions.

- Contains the latest `obsidian.d.ts` file.
    
- Includes plugin structure details (manifest.json, main.js requirements).
    
- Explains app architecture: `App`, `Vault`, `Workspace`, `MetadataCache`.
    

**Why it matters:** If you want to understand Obsidian’s internals or track API changes across versions, this is the place.

## 🧩 High‑Quality Community Documentation

### **4. Unofficial Obsidian Plugin Developer Docs (marcusolsson)**

A respected community‑maintained resource with practical guides.

- Includes tutorials, FAQs, and links to other developer resources.
    
- Covers CodeMirror 6 integration, plugin patterns, and common pitfalls.
    

**Why it matters:** It fills in the gaps left by the official docs with real‑world examples and explanations.

### **5. Obsidian Hub Developer Resources**

A curated collection of community knowledge:

- Plugin mini‑FAQs
    
- Developer tips
    
- Example plugins (Referenced within the marcusolsson docs.)
    

**Why it matters:** It aggregates best practices from experienced plugin authors.

## ⚠️ Not to Be Confused: ObsidianMC

You may encounter “ObsidianMC” documentation—this is **not related** to Obsidian.md. It’s a .NET‑based Minecraft server API.

## 📚 Recommended Deep‑Dive Path

1. **Start with the official Developer Docs** to understand the architecture.
    
2. **Use the TypeScript API Reference** as your day‑to‑day lookup tool.
    
3. **Explore the obsidian‑api GitHub repo** to understand how the API evolves.
    
4. **Supplement with community docs** for practical examples and advanced techniques.
    
5. **Join the Discord developer channels** for real‑time help and discussions.
    

## 🔍 If you want, I can also provide:

- A curated list of _must‑read_ plugin source code
    
- A map of Obsidian’s internal architecture
    
- A learning path for building advanced plugins (e.g., custom views, editors, data models)
    
- A breakdown of undocumented but widely used API patterns
    

Would you like a structured learning roadmap or a deeper architectural analysis next?

[

docs.obsidian.md

Home - Developer Documentation





](https://docs.obsidian.md/Home?utm_source=copilot.com "Home - Developer Documentation")

##### You said

not to be confused with gaming. The one that I am using for Xi

###### Copilot said

**You’re using** _**Obsidian.md**_ **(the note‑taking app), not the gaming engine or the RockRMS “Obsidian” framework. The trusted, developer‑level documentation for** _**your**_ **Obsidian is the official plugin/theme docs, the TypeScript API reference, and a small set of vetted community resources.**

Below is a deep, structured list of the most authoritative sources, all grounded in the search results you triggered.

## 🧭 1. Official, Canonical Obsidian Developer Documentation

The **Obsidian Developer Docs** are the primary, officially maintained source for plugin and theme development. They cover plugin architecture, TypeScript usage, CSS theming, and performance optimization.

**Why it matters:**

- This is the only documentation maintained by the Obsidian team.
    
- It explains the plugin lifecycle, manifest requirements, and how Obsidian loads code.
    
- It links to the official Discord developer channels (#plugin‑dev, #theme‑dev).
    

## 🧩 2. Unofficial but Highly Trusted: Marcus Olsson’s Developer Docs

The **obsidian-plugin-docs** site is the most respected community‑maintained deep‑dive. It includes:

- Advanced plugin patterns
    
- API explanations
    
- Workflow guidance
    
- Architecture diagrams
    
- A curated ecosystem map of all developer resources
    

This documentation is maintained by **Marcus Olsson** and is widely used by experienced plugin authors.

**Why it matters:**

- It fills gaps left by the official docs.
    
- It includes detailed examples and explanations not found elsewhere.
    
- It organizes the entire Obsidian developer ecosystem in one place.
    

## 🧬 3. The Official API Type Definitions (obsidian-api)

The **obsidian-api** repository contains the authoritative `obsidian.d.ts` file, which defines every class, interface, event, and method available to plugin developers. This is the source that powers all TypeScript autocompletion and the DeepWiki API reference.

**Why it matters:**

- It is the _actual_ API surface used by Obsidian.
    
- It includes TSDoc comments describing behavior.
    
- It updates with every Obsidian release.
    

## 🧪 4. The Official Sample Plugin (obsidian-sample-plugin)

This GitHub repo is the recommended starting point for plugin authors. It demonstrates:

- Ribbon icons
    
- Commands
    
- Modals
    
- Settings tabs
    
- Event registration
    
- Build configuration (esbuild, TypeScript, ESLint)
    

It depends directly on the latest `obsidian.d.ts`.

**Why it matters:**

- It shows real, working plugin code.
    
- It reflects current best practices endorsed by the Obsidian team.
    

## 🧭 5. Obsidian Hub Developer Resources

The Obsidian Hub aggregates:

- Plugin mini‑FAQs
    
- Developer tips
    
- Example plugins
    
- Community tutorials
    

This is referenced within Marcus Olsson’s docs as part of the broader ecosystem.

**Why it matters:**

- It’s curated by long‑time plugin developers.
    
- It’s a reliable source of practical, real‑world knowledge.
    

## 🚫 What _Not_ to Confuse With

Your search results also surfaced **RockRMS Obsidian**, a plugin framework unrelated to Obsidian.md. It uses a CLI tool called _rock-dev-tool_ and has a completely different architecture. You can safely ignore this—it's not part of the Obsidian.md ecosystem.

## 📚 Summary: The Most Trusted Sources

**Primary (Official):**

1. Obsidian Developer Docs
    
2. obsidian-api (TypeScript definitions)
    
3. obsidian-sample-plugin (official example)
    

**Secondary (Trusted Community):**

4. Marcus Olsson’s Obsidian Plugin Developer Docs

https://marcusolsson.dev/

5. Obsidian Hub developer resources
    
(https://docs.obsidian.md/Home?utm_source=copilot.com "Home - Developer Documentation")

![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

Message Copilot

![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)