export const mediapipeConfig = {
  wasmPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm',
  modelAssetPath: '/models/hand_landmarker.task',

  runningMode: 'VIDEO',

  numHands: 1,

  minHandDetectionConfidence: 0.5,
  minHandPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
} as const
