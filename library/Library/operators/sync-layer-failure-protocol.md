# Sync-Layer Failure Protocol

When the sync-layer fails, do not attempt to "fix" the sync. Instead, bypass the abstraction.

1. **Identify the Failure:** Recognize the sync-layer as a black box.
2. **Isolate the Substrate:** Move the data to a local, non-synced directory.
3. **Bypass the Abstraction:** Use direct file manipulation or local containers (e.g., ZIP) to ensure data integrity.
4. **Document the Breach:** Treat the failure as a diagnostic signal for the system's architecture.
