import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'
import { mediapipeConfig } from '../../config/mediapipe.config'

export const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(mediapipeConfig.wasmPath)

  return HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: mediapipeConfig.modelAssetPath,
    },
    runningMode: mediapipeConfig.runningMode,
    numHands: mediapipeConfig.numHands,
    minHandDetectionConfidence: mediapipeConfig.minHandDetectionConfidence,
    minHandPresenceConfidence: mediapipeConfig.minHandPresenceConfidence,
    minTrackingConfidence: mediapipeConfig.minTrackingConfidence,
  })
}
