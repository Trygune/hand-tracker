import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { Interaction } from "../interaction.types.js";

export const createDragStartAction = (
  position: CursorPosition,
): Interaction => {
  return {
    type: "drag",
    position,
    drag: "start",
  };
};

export const createDragMoveAction = (position: CursorPosition): Interaction => {
  return {
    type: "drag",
    position,
    drag: "move",
  };
};

export const createDragEndAction = (position: CursorPosition): Interaction => {
  return {
    type: "drag",
    position,
    drag: "end",
  };
};
