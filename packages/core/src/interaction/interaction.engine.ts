import type { CursorPosition } from "../cursor/cursor.types.js";
import type { GestureType } from "../gestures/gesture.types.js";
import type { HandLandmark } from "../hand-tracking/hand.types.js";
import {
  createLeftClickAction,
  createRightClickAction,
} from "./actions/click.action.js";
import { createPointAction } from "./actions/point.action.js";
import { createSelectAction } from "./actions/select.action.js";
import { createScrollAction } from "./actions/scroll.action.js";
import { isLeftClick, isRightClick } from "./detectors/click.detector.js";
import { isDragGesture } from "./detectors/drag.detector.js";
import { isPointGesture } from "./detectors/point.detector.js";
import { isSelectGesture } from "./detectors/select.detector.js";
import { isScrollGesture } from "./detectors/scroll.detector.js";
import { DragEngine } from "./engines/drag.engine.js";
import { ScrollEngine } from "./engines/scroll.engine.js";
import type { Interaction } from "./interaction.types.js";

export class InteractionEngine {
  private previousGesture: GestureType = "none";

  private scrollEngine = new ScrollEngine();
  private dragEngine = new DragEngine();

  update = (
    gesture: GestureType,
    hand: HandLandmark[],
    cursorPosition: CursorPosition,
  ): Interaction => {
    const shouldSelect = isSelectGesture(gesture);

    const shouldPoint = isPointGesture(gesture);

    const shouldLeftClick = isLeftClick(gesture, this.previousGesture);
    const shouldRightClick = isRightClick(gesture, this.previousGesture);

    const shouldDrag = isDragGesture(gesture);
    const shouldScroll = isScrollGesture(gesture);

    const wasScrolling = isScrollGesture(this.previousGesture);

    if (wasScrolling && !shouldScroll) {
      this.scrollEngine.reset();
    }

    let interaction: Interaction = {
      type: "none",
      position: cursorPosition,
    };

    const dragInteraction = this.dragEngine.update(shouldDrag, cursorPosition);

    if (dragInteraction.type !== "none") {
      // Highest priority: drag lifecycle
      interaction = dragInteraction;
    } else if (shouldPoint) {
      // Click event
      interaction = createPointAction(cursorPosition);
    } else if (shouldLeftClick) {
      // Click event
      interaction = createLeftClickAction(cursorPosition);
    } else if (shouldRightClick) {
      // Click event
      interaction = createRightClickAction(cursorPosition);
    } else if (shouldSelect) {
      // Click event
      interaction = createSelectAction(cursorPosition);
    } else if (shouldScroll) {
      // Continuous scroll
      interaction = createScrollAction(
        cursorPosition,
        this.scrollEngine.update(hand),
      );
    }

    this.previousGesture = gesture;

    return interaction;
  };

  reset = (): void => {
    this.previousGesture = "none";
    this.dragEngine.reset();
    this.scrollEngine.reset();
  };
}
