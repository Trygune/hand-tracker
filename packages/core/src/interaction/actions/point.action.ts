import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { Interaction } from "../interaction.types.js";

export const createPointAction = (position: CursorPosition): Interaction => {
  return {
    type: "mouse",
    position,
  };
};
