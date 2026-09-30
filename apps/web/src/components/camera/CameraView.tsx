import { type RefObject } from 'react'
import { cn } from '../../lib/utility/cn'
import type { CameraStatus } from '../../features/camera/camera.types'
import type { HandLandmark } from '@hand-tracker/core'
import HandOverlay from '../hand/HandOverlay'
import { motion } from 'motion/react'
import { Camera, CameraOff, Hand, LoaderCircle, Power } from 'lucide-react'

type CameraViewProps = {
  videoRef: RefObject<HTMLVideoElement | null>
  status: CameraStatus
  error: string | null
  hands: HandLandmark[][]
  isHandTrackingLoading: boolean
  handTrackingError: string | null
  onStart: () => void
  onStop: () => void
}

const CameraView = ({
  videoRef,
  status,
  error,
  hands,
  isHandTrackingLoading,
  handTrackingError,
  onStart,
  onStop,
}: CameraViewProps) => {
  const isReady = status === 'ready'
  const isRequesting = status === 'requesting'

  return (
    <section className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-sm">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          'absolute inset-0 h-full w-full scale-x-[-1] object-cover',
          isReady ? 'block' : 'hidden'
        )}
      />

      {handTrackingError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/90"
        >
          <div className="flex max-w-xs flex-col items-center text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <Hand className="size-5" />
            </div>

            <p className="text-sm font-medium text-zinc-200">
              Hand tracking failed
            </p>

            <p className="mt-1 text-xs text-zinc-500">{handTrackingError}</p>
          </div>
        </motion.div>
      ) : isHandTrackingLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 backdrop-blur-[2px]"
        >
          <div className="flex flex-col items-center">
            <LoaderCircle className="size-7 animate-spin text-blue-500" />

            <p className="mt-3 text-sm font-medium text-zinc-200">
              Starting hand tracking
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Preparing the hand detector...
            </p>
          </div>
        </motion.div>
      ) : (
        isReady && <HandOverlay hands={hands} />
      )}

      {!isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
              {isRequesting ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <CameraOff className="size-5" />
              )}
            </div>

            <h2 className="text-sm font-semibold text-zinc-200">
              {isRequesting ? 'Requesting camera' : 'Camera preview'}
            </h2>

            <p className="mt-1 max-w-xs text-xs text-zinc-500">
              {error ?? 'Enable your camera to start hand tracking.'}
            </p>

            <motion.button
              type="button"
              onClick={onStart}
              disabled={isRequesting}
              whileTap={{ scale: 0.97 }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <Camera className="size-3.5" />

              {isRequesting ? 'Requesting...' : 'Enable camera'}
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="absolute left-4 top-4 z-20 flex items-center justify-center rounded-full border border-white/20 bg-zinc-900/75 p-1.5 shadow-sm backdrop-blur-sm">
        <span
          className={cn(
            'size-1.5 rounded-full',
            isReady
              ? 'bg-red-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
              : 'bg-amber-500'
          )}
        />
      </div>

      {isReady && (
        <motion.button
          type="button"
          onClick={onStop}
          whileTap={{ scale: 0.97 }}
          className="absolute bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/85 px-3 py-2 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
        >
          <Power className="size-3.5" />
          Stop camera
        </motion.button>
      )}
    </section>
  )
}

export default CameraView
