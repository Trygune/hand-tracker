import type { HandLandmark } from "../hand-tracking/hand.types.js";

export const distance = (a: HandLandmark, b: HandLandmark): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
