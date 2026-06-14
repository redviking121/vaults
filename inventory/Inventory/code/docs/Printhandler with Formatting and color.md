### Overview

You’re basically describing a tiny logging/print abstraction: a `PrintHandler` that wraps raw output and adds:

- **Formatting** (prefixes, structure)
- **Timestamps**
- **Color** (per level or context)

I’ll sketch a clean pattern plus a concrete example.

---

### Core design

**Responsibilities for `PrintHandler`:**

- **Message shaping:**
    
    - Add timestamp
    - Add level/tag (INFO, WARN, ERROR, DEBUG)
    - Optional context (module, request id, etc.)
- **Styling:**
    
    - Map level → color
    - Support turning color on/off (e.g., for file logs or tests)
- **Output routing:**
    
    - Default to `stdout`
    - Optionally support `stderr` for errors

---

### Example in Python

```python
import sys
import datetime

class PrintHandler:
    COLORS = {
        "INFO": "\033[32m",   # green
        "WARN": "\033[33m",   # yellow
        "ERROR": "\033[31m",  # red
        "DEBUG": "\033[36m",  # cyan
        "RESET": "\033[0m",
    }

    def __init__(self, use_color=True, stream=sys.stdout, time_format="%Y-%m-%d %H:%M:%S"):
        self.use_color = use_color
        self.stream = stream
        self.time_format = time_format

    def _timestamp(self):
        return datetime.datetime.now().strftime(self.time_format)

    def _format(self, level, msg, context=None):
        ts = self._timestamp()
        ctx = f" [{context}]" if context else ""
        return f"{ts} [{level}]{ctx} {msg}"

    def _colorize(self, level, text):
        if not self.use_color:
            return text
        color = self.COLORS.get(level, "")
        reset = self.COLORS["RESET"]
        return f"{color}{text}{reset}"

    def log(self, level, msg, context=None):
        formatted = self._format(level, msg, context)
        colored = self._colorize(level, formatted)
        print(colored, file=self.stream)

    # Convenience methods
    def info(self, msg, context=None):
        self.log("INFO", msg, context)

    def warn(self, msg, context=None):
        self.log("WARN", msg, context)

    def error(self, msg, context=None):
        self.log("ERROR", msg, context)

    def debug(self, msg, context=None):
        self.log("DEBUG", msg, context)
```

**Usage:**

```python
ph = PrintHandler(use_color=True)

ph.info("Server started", context="bootstrap")
ph.warn("Cache miss rate high", context="cache")
ph.error("Failed to connect to DB", context="db")
ph.debug("Payload: {...}", context="api")
```

---

### Example in TypeScript/JavaScript (console-based)

```ts
type Level = "info" | "warn" | "error" | "debug";

class PrintHandler {
  private useColor: boolean;
  private timeFormat: Intl.DateTimeFormat;

  constructor(useColor = true, locale = "en-US") {
    this.useColor = useColor;
    this.timeFormat = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  private timestamp(): string {
    return this.timeFormat.format(new Date());
  }

  private format(level: Level, msg: string, context?: string): string {
    const ts = this.timestamp();
    const ctx = context ? ` [${context}]` : "";
    return `${ts} [${level.toUpperCase()}]${ctx} ${msg}`;
  }

  private colorize(level: Level, text: string): string {
    if (!this.useColor) return text;

    const colors: Record<Level, string> = {
      info: "\x1b[32m",
      warn: "\x1b[33m",
      error: "\x1b[31m",
      debug: "\x1b[36m",
    };
    const reset = "\x1b[0m";
    return `${colors[level]}${text}${reset}`;
  }

  log(level: Level, msg: string, context?: string) {
    const formatted = this.format(level, msg, context);
    const colored = this.colorize(level, formatted);

    const target =
      level === "error" ? console.error : level === "warn" ? console.warn : console.log;

    target(colored);
  }

  info(msg: string, context?: string) { this.log("info", msg, context); }
  warn(msg: string, context?: string) { this.log("warn", msg, context); }
  error(msg: string, context?: string) { this.log("error", msg, context); }
  debug(msg: string, context?: string) { this.log("debug", msg, context); }
}
```

---

### Small refinements you might like

- **Pluggable formatters:** pass a custom `(level, msg, context) => string`.
- **Pluggable color strategy:** pass a map or function `(level) => colorCode`.
- **Structured payloads:** accept `data?: object` and pretty-print or JSON-encode.
- **Environment-aware:** auto-disable color when not a TTY or when logging to file.

If you tell me your language/runtime (Node, browser, Python, Go, etc.), I can tune this into a drop-in `PrintHandler` for your stack.