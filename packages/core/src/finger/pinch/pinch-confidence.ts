const PINCH_FULL_CONFIDENCE_DISTANCE = 0.06

export const getPinchConfidence = (
  distance: number,
  threshold: number
): number => {
  if (distance >= threshold) {
    return 0
  }

  if (distance <= PINCH_FULL_CONFIDENCE_DISTANCE) {
    return 1
  }

  const subject = threshold - distance
  const abstract = threshold - PINCH_FULL_CONFIDENCE_DISTANCE

  return subject / abstract
}
