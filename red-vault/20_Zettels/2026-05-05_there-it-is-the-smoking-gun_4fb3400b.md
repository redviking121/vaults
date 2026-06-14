---
title: There it is — the smoking gun.
timestamp: 2026-05-05T00:00:00
uid: 4fb3400b
source: 202605050000.md
tags: [struct:list]
---
There it is — the smoking gun.

You’re **definitively** running Obsidian under:

> **Electron Ozone/Wayland (native Wayland backend)**  
> because the command line contains:  
> `--ozone-platform=wayland`

This is the _one_ mode where Obsidian’s DevTools are intentionally crippled or missing.

Let’s break down what this means for you as an operator, not as a casual user.

---

# **1. You are on native Wayland (not XWayland, not X11)**

This is the least desirable mode for plugin development because:

- Full Chromium DevTools are **not available**
- Sources tab is often **missing**
- Network tab is **incomplete or absent**
- Application tab (IndexedDB, LocalStorage) is **missing**
- Performance profiling is **disabled**
- Breakpoints and async stack traces are **unreliable**
- GPU acceleration is on the newer, less stable Wayland path

Electron’s Wayland backend is still maturing, so Obsidian disables or limits DevTools to avoid crashes.

This is why you’ve been feeling the “architecture in flux” — because it is.

---

# **2. Why Obsidian chose Wayland**

Electron 28+ tries to auto-detect Wayland and prefers it when:

- The session is Wayland
- The GPU driver supports it
- No override flags are present

Your system matches all three.

So Obsidian is running **native Wayland**, not XWayland.

---

# **3. What this means for your Xanadu substrate work**

Your workflow requires:

- Real breakpoints
- Real async stack traces
- Real network inspection
- Real storage inspection
- Real performance profiling
- Real plugin execution context

These are **non-negotiable** for building a substrate inside Obsidian.

Native Wayland cannot give you these.

You need **X11** (or at minimum **XWayland**) to unlock the full Chromium DevTools.

---

# **4. Your next move (operator‑grade)**

You have two paths:

---

## **Path A — Force Obsidian into X11 mode only (recommended)**

This gives you:

- Full DevTools
- Stable GPU pipeline
- Predictable plugin debugging
- Mature Electron behavior

You can do this with a launcher override, `.desktop` file edit, or environment variable.

---

## **Path B — Switch your entire session to Xorg**

This forces _all_ apps (including Obsidian) into X11.

This is the “nuclear option,” but it guarantees stability.

---

# **5. Your call**

Do you want to:

- **Force Obsidian into X11 mode only** (surgical, minimal change)
- **Switch your whole Ubuntu session to Xorg** (global, guaranteed)
- **Compare the two approaches**
- **See the exact launcher override to force X11**

Tell me which lane you want to take and I’ll give you the operator‑grade procedure.