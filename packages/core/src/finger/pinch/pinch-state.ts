import type { FingerName } from "../finger.types.js";

const PINCH_START_THRESHOLD = 0.075;
const PINCH_END_THRESHOLD = 0.095;

export class PinchState {
  private state: Record<FingerName, boolean> = {
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  };

  update = (finger: FingerName, distance: number): boolean => {
    const isPinched = this.state[finger];

    if (!isPinched && distance < PINCH_START_THRESHOLD) {
      this.state[finger] = true;
    }

    if (isPinched && distance > PINCH_END_THRESHOLD) {
      this.state[finger] = false;
    }

    return this.state[finger];
  };

  reset = (): void => {
    this.state = {
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    };
  };
}
