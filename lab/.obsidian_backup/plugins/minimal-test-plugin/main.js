const { Plugin, Notice } = require('obsidian');

module.exports = class MyPlugin extends Plugin {
    async onload() {
        console.log("MyPlugin loaded");

        this.addCommand({
            id: "myplugin-hello",
            name: "Say Hello",
            callback: () => {
                new Notice("Hello from MyPlugin!");
            }
        });
    }

    onunload() {
        console.log("MyPlugin unloaded");
    }
};

