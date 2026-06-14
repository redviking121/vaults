You absolutely can, and now that you have native Sync running, mobile voice capture becomes a seamless data pipeline rather than a sync conflict nightmare.

Because you're managing structured atomic notes, you have a few ways to play this depending on how much automation you want to throw at it.

### Method 1: The Fast & Native Way (Audio Files Only)

Obsidian mobile has a built-in audio recorder. You can add the **"Audio recorder: Start/stop recording"** command directly to your mobile toolbar or set it as a **Mobile Quick Action** (the gesture where you swipe down from the top of the screen).

- **How it handles data:** It records a local `.webm` or `.m4a` file and drops it straight into your vault.
    
- **The Sync Advantage:** Native Sync will instantly push that raw audio file to your NOC and desktop vaults in the background. You can listen to it later on your workstation and type out the note there.
    

### Method 2: The "Whisper" Community Plugin (Speech-to-Text)

If you don't want raw audio files cluttering your vault and prefer **immediate markdown text**, the community plugin ecosystem has moved fast here. The standout choice right now is the **Whisper** plugin (by nikdanilov).

- **The Setup:** You install it via Community Plugins and hook it up to an API key (OpenAI, Groq, or even a local Whisper endpoint if you run one on your network).
    
- **The Mobile Workflow:** You pull down your Quick Action or hit a button on your mobile toolbar, speak your mind, and hit stop. It instantly calls the API, transcribes your voice, and drops the clean text right at your cursor in Markdown.
    
- **Post-Processing:** It also supports running the transcript through an LLM immediately after to strip out filler words ("um," "uh"), fix grammar, and format it nicely into bullet points or an atomic note structure.
    

### Method 3: The Dedicated Capture App (Voicenotes.com + Sync)

If you want something that works hands-free or away from the Obsidian app interface (like while driving or walking), people are using dedicated voice tools that bridge into the vault.

There is an official **Voicenotes Sync** plugin in the community store. You record into the Voicenotes mobile app, its AI handles the heavy lifting (transcripts, summaries, action items), and the Obsidian plugin automatically pulls those files down into a designated incoming directory in your vault on a timer.

### Deepening the Workflow

Once you're ready to tackle the configuration later, it's worth mapping out where these voice notes land. Most people find success dumping all mobile voice captures into an `//Inbox` folder, keeping them isolated so they can be processed and split into proper Zettelkasten entries when sitting at the main workstation.