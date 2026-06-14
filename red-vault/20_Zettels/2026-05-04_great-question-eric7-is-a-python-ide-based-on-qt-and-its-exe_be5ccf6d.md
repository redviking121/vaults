---
title: Great question. Eric7 is a Python IDE based on Qt, and its executable location d
timestamp: 2026-05-04T18:06:00
uid: be5ccf6d
source: 202605041806.md
tags: [struct:question, status:actionable, struct:list]
---
Great question. Eric7 is a Python IDE based on Qt, and its executable location depends on how it was installed. Here are the most common places to look:

---

### 📍 Typical Eric7 Installation Paths

#### 🧰 If Installed via Installer (Windows MSI or EXE)

- **Default Location**:
    
    ```
    C:\Program Files\Eric7\eric7.exe
    ```
    
    or
    
    ```
    C:\Program Files (x86)\Eric7\eric7.exe
    ```
    

#### 🐍 If Installed via Python (e.g., pip or source)

- It might be located in your Python `Scripts` directory:
    
    ```
    C:\Users\<YourUsername>\AppData\Local\Programs\Python\Python3x\Scripts\eric7.exe
    ```
    
    or
    
    ```
    C:\Users\<YourUsername>\AppData\Roaming\Python\Python3x\Scripts\eric7.exe
    ```
    

#### 🔍 To Find It Quickly

- Press `Win + S` and type:
    
    ```
    eric7.exe
    ```
    
    or
    
    ```
    Eric7
    ```
    
- Right-click the result → **Open file location**.

---

### 🧭 Alternative: Use PowerShell to Locate It

You can run this in PowerShell to search for it:

```powershell
Get-ChildItem -Path "C:\" -Recurse -Include "eric7.exe" -ErrorAction SilentlyContinue
```

It might take a minute, but it’ll find the executable wherever it’s hiding.

---

Want help creating a clean shortcut once you find it? I can walk you through that too.