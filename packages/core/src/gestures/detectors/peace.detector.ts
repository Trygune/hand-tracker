import { fingerExtension } from "../../finger/finger-extension.js";
import { HandLandmark } from "../../hand-tracking/hand.types.js";

export const getPeaceConfidence = (hand: HandLandmark[]): number => {
  const fingers = fingerExtension(hand);

  const conditions = [
    fingers.index,
    fingers.middle,
    !fingers.ring,
    !fingers.pinky,
  ].filter(Boolean).length;

  return conditions / 4;
};
