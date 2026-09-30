import { app, session } from "electron";
import { createMainWindow } from "./window";
import { createTray } from "./tray";
import { driver } from "./driver";
import { registerCursorHandlers } from "./ipc/cursor";

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler(
    (_webContents, permission, callback) => {
      if (permission === "media") {
        callback(true);
        return;
      }

      callback(false);
    },
  );

  registerCursorHandlers(driver);

  const win = createMainWindow();
  createTray(win);
});

app.on("before-quit", () => {
  (app as any).isQuitting = true;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
