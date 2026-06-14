 const { Plugin } = require("obsidian");

module.exports = class RazorSkeleton extends Plugin {

    async onload() {
        console.log("RazorSkeleton: Loaded");

        // Ribbon icon
        const ribbon = this.addRibbonIcon("dice", "Run Razor Skeleton", () => {
            this.runPipeline();
        });
        ribbon.addClass("razor-skeleton-ribbon");

        // Command palette entry
        this.addCommand({
            id: "run-razor-skeleton",
            name: "Run Razor Skeleton Pipeline",
            callback: () => this.runPipeline()
        });

        // Status bar item
        this.statusBar = this.addStatusBarItem();
        this.statusBar.setText("Ξ Razor Ready");
    }

    onunload() {
        console.log("RazorSkeleton: Unloaded");
    }

    runPipeline() {
        console.log("RazorSkeleton: Pipeline running");

        // Placeholder for your real logic
        new Notice("Razor Skeleton pipeline executed");
    }
};

