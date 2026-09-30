import { Tray, Menu, app, type BrowserWindow } from "electron";
import path from "node:path";

let tray: Tray | null = null;

export function createTray(window: BrowserWindow): Tray {
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, "assets/icon.ico")
    : path.join(__dirname, "../../assets/icon.ico");

  tray = new Tray(iconPath);
  tray.setToolTip("Hand Tracker");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        window.show();
        window.focus();
      },
    },
    {
      label: "Exit",
      click: () => {
        app.exit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // کلیک روی خود آیکون هم پنجره رو نشون بده (روی ویندوز رایجه)
  tray.on("click", () => {
    window.show();
    window.focus();
  });

  return tray;
}
