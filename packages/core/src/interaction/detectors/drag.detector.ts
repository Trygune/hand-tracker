import type { GestureType } from "../../gestures/gesture.types.js";

export const isDragGesture = (gesture: GestureType): boolean => {
  return gesture === "open-hand";
};
