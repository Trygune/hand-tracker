import { HAND_LANDMARK } from "../hand-tracking/hand.constants.js";
import type { HandLandmark } from "../hand-tracking/hand.types.js";
import { isFingerExtended } from "./finger-analyser.js";
import type { fingerState } from "./finger.types.js";

export const fingerExtension = (hand: HandLandmark[]): fingerState => {
  if (hand.length < 21) {
    return {
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    };
  }

  return {
    index: isFingerExtended(
      hand,
      HAND_LANDMARK.INDEX_MCP,
      HAND_LANDMARK.INDEX_PIP,
      HAND_LANDMARK.INDEX_DIP,
    ),

    middle: isFingerExtended(
      hand,
      HAND_LANDMARK.MIDDLE_MCP,
      HAND_LANDMARK.MIDDLE_PIP,
      HAND_LANDMARK.MIDDLE_DIP,
    ),

    ring: isFingerExtended(
      hand,
      HAND_LANDMARK.RING_MCP,
      HAND_LANDMARK.RING_PIP,
      HAND_LANDMARK.RING_DIP,
    ),

    pinky: isFingerExtended(
      hand,
      HAND_LANDMARK.PINKY_MCP,
      HAND_LANDMARK.PINKY_PIP,
      HAND_LANDMARK.PINKY_DIP,
    ),
  };
};
