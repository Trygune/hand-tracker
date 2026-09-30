import { angle } from "../geometry/angle.js";
import type { HandLandmark } from "../hand-tracking/hand.types.js";
import { FINGER_CLOSURE_ANGLE } from "./finger.constants.js";

export const fingerClosure = (
  hand: HandLandmark[],
  mcp: number,
  pip: number,
  tip: number,
): boolean => {
  const fingerAngle = angle(hand[mcp], hand[pip], hand[tip]);

  return fingerAngle < FINGER_CLOSURE_ANGLE;
};
