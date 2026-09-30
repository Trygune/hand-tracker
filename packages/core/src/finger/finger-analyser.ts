import { angle } from "../geometry/angle.js";
import type { HandLandmark } from "../hand-tracking/hand.types.js";

const FINGER_EXTENDED_ANGLE = 160;

export const isFingerExtended = (
  hand: HandLandmark[],
  mcp: number,
  pip: number,
  dip: number,
): boolean => {
  const fingerAngle = angle(hand[mcp], hand[pip], hand[dip]);

  return fingerAngle > FINGER_EXTENDED_ANGLE;
};
