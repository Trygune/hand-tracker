import type { CursorPosition } from "../cursor/cursor.types.js";

export const smoothPosition = (
  current: CursorPosition,
  previous: CursorPosition,
  alpha: number,
): CursorPosition => {
  return {
    x: previous.x + (current.x - previous.x) * alpha,
    y: previous.y + (current.y - previous.y) * alpha,
  };
};
