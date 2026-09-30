import type { HandLandmark } from "../hand-tracking/hand.types.js";

export const angle = (
  a: HandLandmark,
  b: HandLandmark,
  c: HandLandmark,
): number => {
  const ab = {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };

  const cb = {
    x: c.x - b.x,
    y: c.y - b.y,
    z: c.z - b.z,
  };

  const dotProduct = ab.x * cb.x + ab.y * cb.y + ab.z * cb.z;

  const magnitudeAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y + ab.z * ab.z);

  const magnitudeCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y + cb.z * cb.z);

  if (magnitudeAB === 0 || magnitudeCB === 0) {
    return 0;
  }

  const cosine = dotProduct / (magnitudeAB * magnitudeCB);

  const clampedCosine = Math.max(-1, Math.min(1, cosine));

  return Math.acos(clampedCosine) * (180 / Math.PI);
};
