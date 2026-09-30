export const getCameraStream = async (): Promise<MediaStream> => {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Camera API is not supported by this browser.')
  }

  return navigator.mediaDevices.getUserMedia({
    video: {
      width: {
        ideal: 1280,
      },
      height: {
        ideal: 720,
      },
      facingMode: 'user',
    },
    audio: false,
  })
}
