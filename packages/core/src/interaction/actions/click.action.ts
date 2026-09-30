import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { Interaction } from "../interaction.types.js";

export const createLeftClickAction = (
  position: CursorPosition,
): Interaction => {
  return {
    type: "left-click",
    position,
  };
};

export const createRightClickAction = (
  position: CursorPosition,
): Interaction => {
  return {
    type: "right-click",
    position,
  };
};
