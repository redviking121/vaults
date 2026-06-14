---
title: Roger that, Red.
timestamp: 2026-05-04T23:08:00
uid: ea7a884f
source: 202605042308.md
tags: []
---
Roger that, Red.  
`init 6` is the cleanest way to flush every dangling process, stale locale state, and half‑open rclone config session. When you come back up, we’ll treat the machine like a fresh lab bench.

Here’s the plan for when you’re back online — tight, minimal, operator‑grade:

---

# **POST‑REBOOT CHECKLIST (do these in order)**

### **1. Verify no zombie rclone processes**

```
ps aux | grep rclone
```

If anything shows besides the grep line, kill it.

---

### **2. Verify your locale**

We need to confirm whether the French locale is still in play.

```
locale
```

If you see anything like:

```
LANG=fr_FR.UTF-8
LC_ALL=fr_FR.UTF-8
```

then we know exactly why “fichier” keeps appearing.

If it’s English, we’ll adjust accordingly.

---

### **3. Start a clean config session with locale override**

This is the key:

```
LANG=C rclone config
```

This forces English backend names and prevents the auto‑selection of “fichier.”

---

### **4. Create the remote**

Inside that session:

```
n
name> gdrive
```

You _should_ now see the backend list.  
If you do, select:

```
drive
```

If you don’t, we go to the forced‑backend method.

---

### **5. If the backend list STILL doesn’t appear**

We skip the UI entirely and force rclone into the correct backend:

```
LANG=C rclone config create gdrive drive
LANG=C rclone config reconnect gdrive:
```

This bypasses every broken menu and jumps straight to OAuth.

---

# **When you’re back from init 6, just say:**

> “Back.”

And I’ll take you through the next exact keystrokes.