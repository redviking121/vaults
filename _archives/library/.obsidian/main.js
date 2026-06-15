class LibraryNoteFactory {
    constructor(app) {
        this.app = app;
        this.api = {
            create: (type) => this.createNote(type)
        };
    }

    async createNote(type) {
        const now = window.moment();
        const date = now.format("YYYYMMDD");
        const time = now.format("HHmm");
        const rand = Math.random().toString(36).substring(2, 6);

        const patterns = {
            session: `${date}-${time}_session.md`,
            rfc: `RFC-${date}-${rand}.md`,
            battleplan: `BP-${date}-${rand}.md`,
            grimoire: `GRIM-${rand}.md`,
            ledger: `LED-${date}-${rand}.md`,
            mcp: `MCP-${rand}.md`
        };

        const templateMap = {
            session: "Templates/Classes/00_session.md",
            rfc: "Templates/Classes/00_rfc.md",
            battleplan: "Templates/Classes/00_battleplan.md",
            grimoire: "Templates/Classes/00_grimoire.md",
            ledger: "Templates/Classes/00_ledger.md",
            mcp: "Templates/Classes/00_mcp.md"
        };

        const filename = patterns[type];
        const templatePath = templateMap[type];

        const file = await this.app.vault.create(filename, "");
        const template = await this.app.vault.adapter.read(templatePath);

        await this.app.vault.modify(file, template);

        this.app.workspace.getLeaf().openFile(file);
    }
}

module.exports = LibraryNoteFactory;
