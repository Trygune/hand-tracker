import { HAND_LANDMARK } from "../../hand-tracking/hand.constants.js";
import type { HandLandmark } from "../../hand-tracking/hand.types.js";
import type { ScrollDelta } from "../interaction.types.js";

const SCROLLSENSITIVITY = 500;
const SCROLLDEADZONE = 0.003;

export class ScrollEngine {
  private previousY: number | null = null;

  update = (hand: HandLandmark[]): ScrollDelta => {
    const indexTip = hand[HAND_LANDMARK.INDEX_TIP];
    const middleTip = hand[HAND_LANDMARK.MIDDLE_TIP];

    if (!indexTip || !middleTip) {
      return {
        x: 0,
        y: 0,
      };
    }

    const currentY = indexTip.y + middleTip.y;

    if (this.previousY === null) {
      this.previousY = currentY;

      return {
        x: 0,
        y: 0,
      };
    }

    const deltaY = currentY - this.previousY;

    this.previousY = currentY;

    if (Math.abs(deltaY) < SCROLLDEADZONE) {
      return {
        x: 0,
        y: 0,
      };
    }

    return {
      x: 0,
      y: deltaY * SCROLLSENSITIVITY,
    };
  };

  reset = (): void => {
    this.previousY = null;
  };
}
