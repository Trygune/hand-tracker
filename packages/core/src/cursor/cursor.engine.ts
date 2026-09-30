import { smoothPosition } from "../geometry/smoothing.js";
import { HAND_LANDMARK } from "../hand-tracking/hand.constants.js";
import { HandLandmark } from "../hand-tracking/hand.types.js";
import { CURSOR_SMOOTHING_ALPHA } from "./cursor.constants.js";
import { CursorPosition } from "./cursor.types.js";

export class CursorEngine {
  private position: CursorPosition = {
    x: 0.5,
    y: 0.5,
  };

  update = (hand: HandLandmark[]): CursorPosition => {
    const indexTip = hand[HAND_LANDMARK.INDEX_TIP];

    if (!indexTip) {
      return this.position;
    }

    const targetPosition: CursorPosition = {
      x: 1 - indexTip.x,
      y: indexTip.y,
    };

    this.position = smoothPosition(
      targetPosition,
      this.position,
      CURSOR_SMOOTHING_ALPHA,
    );

    return this.position;
  };

  getPosition = (): CursorPosition => {
    return this.position;
  };

  reset = (): void => {
    this.position = {
      x: 0.5,
      y: 0.5,
    };
  };
}
