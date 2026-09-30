import type { HandLandmark } from "../hand-tracking/hand.types.js";
import { getFistConfidence } from "./detectors/fist.detector.js";
import { getIndexPinchConfidence } from "./detectors/index-pinch.detector.js";
import { getOpenPalmConfidence } from "./detectors/open-palm.detector.js";
import { getPeaceConfidence } from "./detectors/peace.detector.js";
import { getPointConfidence } from "./detectors/point.detector.js";
import { getRockConfidence } from "./detectors/rock.detector.js";
import { MIN_CONFIDENCE } from "./gesture.constants.js";
import type { GestureDetection } from "./gesture.types.js";

// Specific / Complex
//         ↓
// Multi-finger pinch
//         ↓
// Single-finger pinch
//         ↓
// Open hand
//         ↓
// Peace
//         ↓
// Point
//         ↓
// Fist
//         ↓
// None

export const detectGesture = (hand: HandLandmark[]): GestureDetection => {
  const candidates: GestureDetection[] = [];

  const indexPinkyPinch = getRockConfidence(hand);
  const indexPinch = getIndexPinchConfidence(hand);
  const openPalm = getOpenPalmConfidence(hand);
  const peace = getPeaceConfidence(hand);
  const point = getPointConfidence(hand);
  const fist = getFistConfidence(hand);

  if (indexPinkyPinch > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "rock",
      confidence: indexPinkyPinch,
    });
  }

  if (indexPinch > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "index-pinch",
      confidence: indexPinch,
    });
  }

  if (openPalm > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "open-hand",
      confidence: openPalm,
    });
  }

  if (peace > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "peace",
      confidence: peace,
    });
  }

  if (point > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "point",
      confidence: point,
    });
  }

  if (fist > MIN_CONFIDENCE) {
    candidates.push({
      gesture: "fist",
      confidence: fist,
    });
  }

  if (candidates.length === 0) {
    return {
      gesture: "none",
      confidence: 0,
    };
  }

  return candidates.reduce((best, candidate) =>
    candidate.confidence > best.confidence ? candidate : best,
  );
};
