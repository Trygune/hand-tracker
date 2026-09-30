import { ipcMain } from "electron";
import { CH } from "./channels";
import { MouseDriver } from "@hand-tracker/driver";
import { CursorPosition, MouseButton, ScrollDelta } from "@hand-tracker/core";

export const registerCursorHandlers = (driver: MouseDriver) => {
  ipcMain.on(CH.move, (_e, p: CursorPosition) => {
    driver.moveMouse(p.x, p.y);
  });

  ipcMain.on(CH.click, (_e, b: MouseButton) => {
    driver.clickMouse(b);
  });

  ipcMain.on(CH.scroll, (_e, d: ScrollDelta) => driver.scrollMouse(d));

  ipcMain.on(CH.dragStart, (_e, s: "down") => driver.toggleMouse(s));

  ipcMain.on(CH.dragMove, (_e, p: CursorPosition) =>
    driver.dragMouse(p.x, p.y),
  );

  ipcMain.on(CH.dragEnd, (_e, s: "up") => driver.toggleMouse(s));
};
