import type { GestureType } from "../../gestures/gesture.types.js";

export const isLeftClick = (
  gesture: GestureType,
  previousGesture: GestureType,
): boolean => {
  return gesture === "index-pinch" && previousGesture !== "index-pinch";
};

export const isRightClick = (
  gesture: GestureType,
  previousGesture: GestureType,
): boolean => {
  return gesture === "rock" && previousGesture !== "rock";
};
