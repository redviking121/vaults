---
title: Ah, perfect — **P100 + K80** tells me exactly what class of hardware you’re deal
timestamp: 2026-05-04T20:25:00
uid: 1521915b
source: 202605042025.md
tags: [struct:list]
---
Ah, perfect — **P100 + K80** tells me exactly what class of hardware you’re dealing with, and that narrows the missing part down to one thing.

## 🎯 The part you’re missing is a **PCIe riser**

Specifically, the **mining‑style PCIe x16 riser** (VER009S or similar).  
Both the **Tesla P100** and **Tesla K80** are _server GPUs_ with no video output, so they **must** be connected through a riser when used in an open‑air rack.

Your rack didn’t include one because **racks never ship with risers** — they only ship the metal frame.

---

## 🧩 Why it’s a riser (not a backplane)

A _backplane_ is used in server chassis (Dell, Supermicro, etc.).  
But:

- You have a **mining‑style open GPU rack**
- You’re running **external GPUs**
- You’re using **individual cards (P100, K80)**
- You’re not using a server chassis with a proprietary midplane

That means the missing board is the **PCIe riser** that gives you:

- The **PCIe x16 slot** the GPU plugs into
- The **USB‑style cable** that runs to the motherboard
- The **power input** (6‑pin PCIe recommended for K80/P100)

---

## 🧠 Important detail for _your_ GPUs

### ✔ Tesla K80

- Draws **300W**
- MUST use a riser powered by **6‑pin PCIe**, not SATA
- SATA → Molex → PCIe adapters will melt under K80 load

### ✔ Tesla P100 (PCIe version)

- Draws **250W**
- Also prefers **6‑pin PCIe powered risers**

So you want **VER009S or VER010S risers with 6‑pin PCIe input**.

---

## 🔧 What to buy (the correct item name)

Search for:

**“PCIe x16 GPU riser VER009S 6‑pin”**

or

**“PCIe GPU riser mining riser 009S”**

That’s the exact part.

---

## If you want, I can:

- Recommend the safest riser model for K80/P100
- Sketch the wiring layout
- Tell you how many risers you need
- Check your PSU and cables for compatibility

Just tell me what rack you bought or send a link.