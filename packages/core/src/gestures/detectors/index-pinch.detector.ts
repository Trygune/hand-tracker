import { getPinchConfidence } from "../../finger/pinch/pinch-confidence.js";
import { thumbPinch } from "../../finger/pinch/thumb-pinch.js";
import { distance } from "../../geometry/distance.js";
import { HAND_LANDMARK } from "../../hand-tracking/hand.constants.js";
import type { HandLandmark } from "../../hand-tracking/hand.types.js";

const PINCH_START_THRESHOLD = 0.08;

export const getIndexPinchConfidence = (hand: HandLandmark[]): number => {
  const fingers = thumbPinch(hand);

  if (!fingers.index || fingers.middle || fingers.ring || fingers.pinky) {
    return 0;
  }

  const pinchDistance = distance(
    hand[HAND_LANDMARK.THUMB_TIP],
    hand[HAND_LANDMARK.INDEX_TIP],
  );

  return getPinchConfidence(pinchDistance, PINCH_START_THRESHOLD);
};

// اما یک نکته مهم: این confidence فعلاً فقط بر اساس فاصله‌ی pinch است و شرط folded بودن بقیه انگشت‌ها binary است. برای مرحله‌ی اول خوب است؛ بعداً می‌توانیم همین بخش را دقیق‌تر کنیم.
