import type { CursorPosition } from "../../cursor/cursor.types.js";

export interface CursorExecutor {
  move: (position: CursorPosition) => void;
  drag: (position: CursorPosition) => void;
}
