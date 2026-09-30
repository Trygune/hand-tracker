import type { GestureType } from "../../gestures/gesture.types.js";

export const isScrollGesture = (gesture: GestureType): boolean => {
  return gesture === "peace";
};
