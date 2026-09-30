import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { CursorExecutor } from "./cursor.executor.js";

export class BrowserCursorExecutor implements CursorExecutor {
  move = (_position: CursorPosition): void => {
    // Browser cursor is rendered by VirtualCursor component
  };
  drag = (_position: CursorPosition): void => {
    // Browser cursor is rendered by VirtualCursor component
  };
}
