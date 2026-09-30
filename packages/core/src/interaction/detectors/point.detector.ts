import type { GestureType } from "../../gestures/gesture.types.js";

export const isPointGesture = (gesture: GestureType): boolean => {
  return gesture === "point";
};
