Because Wayland operates differently from the old Xorg framework, it doesn't have a single, centralized server log file (like `/var/log/Xorg.0.log`). Instead, the Wayland compositor runs directly inside your display manager or desktop environment session.

On Ubuntu 24.04 (Noble Numbat), almost everything related to a Wayland graphical freeze is piped directly into **systemd's journal**.

Here are the most effective ways to pull up relevant debugging information.

### 1. The Primary Tool: `journalctl`

Since a freeze usually cuts off your current terminal, you will likely need to check the logs **from your previous boot session** after a hard restart.

- **View the logs of the last boot session leading right up to the crash:**
    
    Bash
    
    ```
    journalctl -b -1 -e
    ```
    
    - `-b -1` targets the _previous_ boot session.
        
    - `-e` jumps straight to the end of the log (where the freeze occurred).
        
- **Filter specifically for the GNOME Display Manager (GDM) and Shell:**
    
    If you are running default Ubuntu (GNOME), the desktop session and Wayland interaction are bound to `gdm` and `gnome-shell`.
    

Bash

````
    journalctl -b -1 _TRANSPORT=stdout | grep -E "gnome-shell|gdm|wayland"
    ```

*   **Check for general process crashes around the time of the freeze:**
    
```bash
    journalctl -b -1 -p err..emerg
    ```
    This filters the previous boot to only show priority levels from "Error" up to "Emergency", cutting out the normal background noise.

### 2. Check for Apport Core Dumps
Ubuntu 24.04 uses `apport` to catch system and application crashes. If the Wayland compositor or a graphical tool completely crashed and dumped its memory, it will leave an encoded `.crash` file here:

```bash
ls -la /var/crash/
````

If you see a recent file (e.g., matching `_usr_bin_gnome-shell...crash`), you can view a human-readable summary of what caused it by running:

Bash

```
apport-cli -c /var/crash/YOUR_CRASH_FILE.crash
```

### 3. Check for GPU / Kernel Panics

Wayland relies heavily on direct rendering and kernel mode setting (KMS). Often, a Wayland freeze is actually a symptom of a GPU driver choking. Check the kernel ring buffer logs from the crash:

Bash

```
journalctl -b -1 -k | grep -E "drm|i915|amdgpu|nvidia|nouveau"
```

Look for phrases like _GPU hang_, _flip queue timed out_, or _Resetting GPU_.

### Red Flags to Look For in the Logs

When scrolling through the output of the commands above, keep an eye out for these frequent Ubuntu 24.04 Wayland culprits:

- `org.gnome.Shell.desktop[...]: Error reading events from display: Broken pipe` _(Signifies the Wayland connection severed abruptly)_
    
- `gdm-wayland-session` lines ending with `Signal 11` (Segmentation fault) or `Signal 6` (Aborted).
    
- Hardware acceleration issues tied to specific browsers or applications (disabling hardware acceleration in Chrome/Electron apps is a common workaround for 24.04 Wayland freezes).