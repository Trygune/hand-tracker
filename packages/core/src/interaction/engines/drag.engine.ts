import type { CursorPosition } from "../../cursor/cursor.types.js";
import {
  createDragEndAction,
  createDragMoveAction,
  createDragStartAction,
} from "../actions/drag.action.js";
import type { Interaction } from "../interaction.types.js";
import { DragStateManager } from "../state/drag-state.js";

export class DragEngine {
  private dragState = new DragStateManager();

  update = (
    isDragging: boolean,
    cursorPosition: CursorPosition,
  ): Interaction => {
    const state = this.dragState.getState();

    if (state === "idle" && isDragging) {
      this.dragState.start();

      return createDragStartAction(cursorPosition);
    }

    if (state === "dragging" && isDragging) {
      return createDragMoveAction(cursorPosition);
    }

    if (state === "dragging" && !isDragging) {
      this.dragState.end();

      return createDragEndAction(cursorPosition);
    }

    return {
      type: "none",
      position: cursorPosition,
    };
  };

  reset = (): void => {
    this.dragState.reset();
  };
}
