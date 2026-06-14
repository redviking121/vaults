---
title: **Yes — you _can_ make scrollbars wider in Ubuntu, but you must do it by overrid
timestamp: 2026-05-04T22:45:00
uid: 614dd946
source: 202605042245.md
tags: [struct:question, struct:list]
---
**Yes — you _can_ make scrollbars wider in Ubuntu, but you must do it by overriding your GTK theme with a small CSS file.** The system settings don’t expose this, so the fix lives in `~/.config/gtk-3.0/gtk.css`. [Ask Ubuntu](https://askubuntu.com/questions/775201/how-do-i-get-a-bigger-static-scrollbar-aka-normal-scrollbar)

---

### 🧩 Why this works

Ubuntu (GNOME) scrollbars are controlled by the **GTK theme**, not a global setting. By adding a custom CSS override in your home directory, you can increase the **slider width**, **stepper size**, and optionally restore the old-style arrows.

This affects **GTK3 apps** (Nautilus, Gedit, Settings, etc.). GTK4 apps use a different system and may not fully obey these overrides.

---

### ✅ The fix: widen scrollbars via `gtk.css`

1. Create the directory if it doesn’t exist:

```bash
mkdir -p ~/.config/gtk-3.0
```

2. Create or edit:

```
~/.config/gtk-3.0/gtk.css
```

3. Add this block (20px is a good starting width):

```css
.scrollbar {
    -GtkRange-slider-width: 20;
    -GtkRange-stepper-size: 20;
    -GtkScrollbar-has-backward-stepper: true;
    -GtkScrollbar-has-forward-stepper: true;
}
```

[Ask Ubuntu](https://askubuntu.com/questions/775201/how-do-i-get-a-bigger-static-scrollbar-aka-normal-scrollbar)

4. Save the file.
    
5. **Log out and back in**, or simply restart any GTK app to see the change.
    

---

### 🧪 Optional: copy your theme’s full CSS for deeper control

If you want more precise styling, you can copy your theme’s original GTK CSS:

```bash
cp /usr/share/themes/Yaru/gtk-3.0/gtk.css ~/.config/gtk-3.0/
```

Then edit it freely. This gives you full control but only affects your user account. [Ask Ubuntu](https://askubuntu.com/questions/775201/how-do-i-get-a-bigger-static-scrollbar-aka-normal-scrollbar)

---

### 🛑 Notes & limitations

- **GTK4 apps** (like newer GNOME apps) may ignore these settings.
- **Firefox** uses its own scrollbar styling unless you enable system scrollbars.
- If you switch themes, you may need to adjust your overrides.

---

### Want me to generate a ready‑to‑paste `gtk.css` tuned for your exact theme (Yaru, Adwaita, etc.) and preferred width?