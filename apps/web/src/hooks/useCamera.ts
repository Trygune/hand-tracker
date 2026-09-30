import { useCallback, useEffect, useRef, useState } from 'react'
import { getCameraStream } from '../features/camera/camera.service'
import type { CameraStatus } from '../features/camera/camera.types'

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [status, setStatus] = useState<CameraStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setStatus('requesting')
      setError(null)

      const stream = await getCameraStream()

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setStatus('ready')
    } catch (error) {
      console.error('Failed to start camera:', error)

      setStatus(
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'denied'
          : 'error'
      )

      setError(
        error instanceof Error ? error.message : 'Failed to access camera.'
      )
    }
  }, [])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop()
    })

    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setStatus('idle')
  }, [])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [])

  return {
    videoRef,
    status,
    error,
    startCamera,
    stopCamera,
  }
}
