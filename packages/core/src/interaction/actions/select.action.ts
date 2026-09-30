import type { CursorPosition } from "../../cursor/cursor.types.js";
import type { Interaction } from "../interaction.types.js";

export const createSelectAction = (position: CursorPosition): Interaction => {
  return {
    type: "select",
    position,
  };
};
