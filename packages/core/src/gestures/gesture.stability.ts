import type { GestureType } from "./gesture.types.js";

const REQUIRED_FRAMES = 3;

export class GestureStability {
  private current: GestureType = "none";
  private candidate: GestureType = "none";
  private candidateFrames = 0;

  update = (gesture: GestureType): GestureType => {
    if (gesture === this.current) {
      this.candidate = gesture;
      this.candidateFrames = 0;

      return this.current;
    }

    if (gesture !== this.candidate) {
      this.candidate = gesture;
      this.candidateFrames = 1;

      return this.current;
    }

    this.candidateFrames += 1;

    if (this.candidateFrames >= REQUIRED_FRAMES) {
      this.current = this.candidate;
      this.candidateFrames = 0;
    }

    return this.current;
  };

  reset = (): void => {
    this.current = "none";
    this.candidate = "none";
    this.candidateFrames = 0;
  };
}
