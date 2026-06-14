That _is_ a bit weird at first glance, but it actually makes total sense why that happened!

Because you moved the vault out of `Documents`, Obsidian treats it like a brand-new vault configuration on the application side. Some community plugins store their sensitive API keys and subscription data outside the main vault folder—either in your system's global application cache or tied strictly to the absolute file path of the vault. When the path changed from `~/Documents/...` to `~/dev/vaults/...`, the plugin looked at the new path, couldn't find an associated key in the local cache, and reverted to a blank state.

Re-entering the key should seal the deal and bind it to the new location.

Once you paste it back in, give a quick feature a spin just to verify the handshake with the model is working smoothly from the new directory. Let me know if it gives you any pushback!