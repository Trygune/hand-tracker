import { fingerClosure } from "../../finger/finger-closure.js";
import { HAND_LANDMARK } from "../../hand-tracking/hand.constants.js";
import type { HandLandmark } from "../../hand-tracking/hand.types.js";

export const getFistConfidence = (hand: HandLandmark[]): number => {
  const closedCount = [
    fingerClosure(
      hand,
      HAND_LANDMARK.INDEX_MCP,
      HAND_LANDMARK.INDEX_PIP,
      HAND_LANDMARK.INDEX_TIP,
    ),
    fingerClosure(
      hand,
      HAND_LANDMARK.MIDDLE_TIP,
      HAND_LANDMARK.MIDDLE_PIP,
      HAND_LANDMARK.MIDDLE_MCP,
    ),
    fingerClosure(
      hand,
      HAND_LANDMARK.RING_TIP,
      HAND_LANDMARK.RING_PIP,
      HAND_LANDMARK.RING_MCP,
    ),
    fingerClosure(
      hand,
      HAND_LANDMARK.PINKY_TIP,
      HAND_LANDMARK.PINKY_PIP,
      HAND_LANDMARK.PINKY_MCP,
    ),
  ].filter(Boolean).length;

  return closedCount / 4;
};
