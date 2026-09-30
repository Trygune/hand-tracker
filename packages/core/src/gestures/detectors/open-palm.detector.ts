import { fingerExtension } from "../../finger/finger-extension.js";
import { HandLandmark } from "../../hand-tracking/hand.types.js";

export const getOpenPalmConfidence = (hand: HandLandmark[]): number => {
  const fingers = fingerExtension(hand);

  const extendedCount = [
    fingers.index,
    fingers.middle,
    fingers.ring,
    fingers.pinky,
  ].filter(Boolean).length;

  return extendedCount / 4;
};
