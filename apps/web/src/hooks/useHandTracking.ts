import { useEffect, useRef, useState } from 'react'
import { HandTracker } from '../features/hand-tracking/hand-tracker'
import { createHandLandmarker } from '../lib/mediapipe/hand-landmarker'
import type { HandLandmark } from '@hand-tracker/core'

type UseHandTrackingProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  enabled: boolean
}

export const useHandTracking = ({
  videoRef,
  enabled,
}: UseHandTrackingProps) => {
  const trackerRef = useRef<HandTracker | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const fpsFramesRef = useRef(0)
  const fpsLastTimeRef = useRef(0)

  const [hands, setHands] = useState<HandLandmark[][]>([])
  const [fps, setFps] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false

    const initialize = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        const landmarker = await createHandLandmarker()

        if (cancelled) {
          landmarker.close()
          return
        }

        trackerRef.current = new HandTracker(landmarker)

        const detect = (): void => {
          if (cancelled) {
            return
          }

          const video = videoRef.current
          const tracker = trackerRef.current

          if (!video || !tracker) {
            animationFrameRef.current = requestAnimationFrame(detect)
            return
          }

          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            const detectedHands = tracker.detect(video, performance.now())

            setHands(detectedHands)

            const now = performance.now()

            if (fpsLastTimeRef.current === 0) {
              fpsLastTimeRef.current = now
            }

            fpsFramesRef.current++

            const elapsed = now - fpsLastTimeRef.current

            if (elapsed >= 1000) {
              setFps(Math.round((fpsFramesRef.current * 1000) / elapsed))

              fpsFramesRef.current = 0
              fpsLastTimeRef.current = now
            }
          }

          animationFrameRef.current = requestAnimationFrame(detect)
        }

        setLoading(false)

        animationFrameRef.current = requestAnimationFrame(detect)
      } catch (error) {
        if (cancelled) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Failed to initialize hand tracking'
        )

        setLoading(false)
      }
    }

    void initialize()

    return () => {
      cancelled = true

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = null

      trackerRef.current?.close()
      trackerRef.current = null

      fpsFramesRef.current = 0
      fpsLastTimeRef.current = 0
    }
  }, [enabled])

  return {
    hands,
    fps,
    loading,
    error,
  }
}
