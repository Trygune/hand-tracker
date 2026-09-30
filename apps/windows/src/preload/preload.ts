import { contextBridge, ipcRenderer } from "electron";
import type { DesktopAPI } from "../shared/desktop-api";
import type {
  CursorPosition,
  MouseButton,
  ScrollDelta,
} from "@hand-tracker/core";

const desktopAPI: DesktopAPI = {
  moveCursor: (position: CursorPosition) => {
    return ipcRenderer.send("cursor:move", position);
  },
  clickCursor: (button: MouseButton) => {
    return ipcRenderer.send("cursor:click", button);
  },
  scrollCursor: (delta: ScrollDelta) => {
    return ipcRenderer.send("cursor:scroll", delta);
  },
  toggleCursor: (state: "down" | "up") => {
    if (state === "down") {
      return ipcRenderer.send("cursor:drag-start", "down");
    }
    if (state === "up") {
      return ipcRenderer.send("cursor:drag-end", "up");
    }
  },
  dragCursor: (position: CursorPosition) => {
    return ipcRenderer.send("cursor:drag-move", position);
  },
};

contextBridge.exposeInMainWorld("desktop", desktopAPI);
