Voice capture on mobile is a massive friction-reducer, especially when you want to catch a fleeting thought or log a system state without stopping to type on a glass screen. Since you're syncing with the NOC now, those captures will land right where your scripts can get to them.

You have a few distinct ways to handle this on a cell phone, depending on whether you just want the raw audio or an automated, intelligent transcription pipeline.

### Method 1: The Raw Native Route (Core Plugin)

Obsidian has a built-in core plugin called **Audio Recorder**. It’s minimal, but it requires zero configuration.

- **How it works:** You turn it on in settings, tap a microphone icon on your mobile toolbar, and speak.
    
- **The Result:** It saves an `.mp3` or `.m4a` file directly into your vault assets folder and embeds an audio player right inside your active note.
    
- **The Catch:** It doesn't transcribe. It’s purely an audio file, meaning you have to listen back to it later or let a desktop script process it post-sync.
    

### Method 2: High-Fidelity API Transcription (The "Whisper" Plugin)

If you want your spoken words turned into clean Markdown text right at your cursor on mobile, the community plugin **Whisper** (by Nik Danilov) is excellent.

- **How it works:** You point it at an API endpoint—like an OpenAI key or even a local self-hosted Whisper instance if you run one on your infrastructure. On your phone, you tap the hotkey or toolbar button, talk, and tap it again.
    
- **The Result:** The remote API converts your speech to text in seconds and drops the text straight into your note.
    
- **Post-Processing:** You can configure it to run the raw text through a language model right after transcription to automatically strip out filler words, fix formatting, or even extract automated `[ ]` Markdown task lists.
    

### Method 3: The Write-Only External Capture (Dedicated Mobile Apps)

Sometimes opening the full Obsidian mobile app, waiting for the workspace to load, and navigating to a note takes too long. If you want a "one-tap and talk" experience, there are dedicated utilities designed explicitly to feed into Obsidian vaults:

- **Obsidian Voice (Mobile App):** A dedicated companion app on the Google Play / iOS App Store built specifically to capture one-tap voice notes, transcribe them via Whisper, generate summaries, and dump the resulting `.md` files directly into your synced vault folder.
    
- **OS Native Tools:** On Android, you can use automated tools (like Tasker) or native voice-to-text keyboards to quickly pipe text into a scratchpad file that handles your rapid mobile intake.
    

When you get around to messing with it later, a great starting workflow is to designate a single `Incoming/` or `Mobile/` directory in your vault specifically for these voice files. That keeps your automated inputs isolated from your deeper, structured knowledge base until you're ready to triage them from the desktop side.