import { app, BrowserWindow } from "electron";
import path from "node:path";

export function createMainWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }

  win.on("minimize", () => {
    win.hide();
  });

  win.on("close", (event) => {
    if (!(app as any).isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });

  return win;
}
