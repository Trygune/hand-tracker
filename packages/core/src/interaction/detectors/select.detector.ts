import type { GestureType } from "../../gestures/gesture.types.js";

export const isSelectGesture = (gesture: GestureType): boolean => {
  return gesture === "fist";
};
