import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { Interaction, ScrollDelta } from "../interaction.types.js";

export const createScrollAction = (
  position: CursorPosition,
  delta: ScrollDelta,
): Interaction => {
  return {
    type: "scroll",
    position,
    scroll: delta,
  };
};
