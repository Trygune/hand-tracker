import { distance } from "../../geometry/distance.js";
import { HAND_LANDMARK } from "../../hand-tracking/hand.constants.js";
import type { HandLandmark } from "../../hand-tracking/hand.types.js";
import type { ThumbPinchState } from "../finger.types.js";
import { PinchState } from "./pinch-state.js";

const pinchState = new PinchState();

export const thumbPinch = (hand: HandLandmark[]): ThumbPinchState => {
  if (hand.length < 21) {
    pinchState.reset();

    return {
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    };
  }

  return {
    index: pinchState.update(
      "index",
      distance(hand[HAND_LANDMARK.THUMB_TIP], hand[HAND_LANDMARK.INDEX_TIP]),
    ),

    middle: pinchState.update(
      "middle",
      distance(hand[HAND_LANDMARK.THUMB_TIP], hand[HAND_LANDMARK.MIDDLE_TIP]),
    ),

    ring: pinchState.update(
      "ring",
      distance(hand[HAND_LANDMARK.THUMB_TIP], hand[HAND_LANDMARK.RING_TIP]),
    ),

    pinky: pinchState.update(
      "pinky",
      distance(hand[HAND_LANDMARK.THUMB_TIP], hand[HAND_LANDMARK.PINKY_TIP]),
    ),
  };
};
