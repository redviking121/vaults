# 260-physical-friction-is-a-diagnostic-signal

Technical glitches and systemic friction are not merely annoyances to be bypassed; they are diagnostic signals that reveal the underlying architecture of the system. When a tool fails to behave as expected, it is often because it is bumping against the hidden constraints of the substrate (e.g., Wayland, Electron sandboxing, or OS-level security).

## Core Principle
**Treat friction as data.** Instead of viewing a bug as a failure of the tool, view it as a map of the system's boundaries.

## Application
- When a system resists, document the point of resistance.
- Analyze the "Trifecta of Failure" (e.g., Electron + Wayland + Sandbox) to understand why the friction exists.
- Use the friction to refine your operational model of the system.
