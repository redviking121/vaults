from pathlib import Path
from ..tui.app import InventoryApp

def cmd_tui(root: str):
    app = InventoryApp(Path(root))
    app.run()
