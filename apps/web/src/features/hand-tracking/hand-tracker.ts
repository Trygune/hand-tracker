import type { HandLandmarker } from '@mediapipe/tasks-vision'
import type { HandLandmark } from '@hand-tracker/core'

export class HandTracker {
  private readonly landmarker: HandLandmarker

  constructor(landmarker: HandLandmarker) {
    this.landmarker = landmarker
  }

  detect = (video: HTMLVideoElement, timestamp: number): HandLandmark[][] => {
    const result = this.landmarker.detectForVideo(video, timestamp)

    return result.landmarks.map((hand) =>
      hand.map(({ x, y, z }) => ({
        x,
        y,
        z,
      }))
    )
  }

  close = (): void => {
    this.landmarker.close()
  }
}
