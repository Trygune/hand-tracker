import VirtualCursor from '../components/cursor/VirtualCursor'
import { useCamera } from '../hooks/useCamera'
import { useHandTracking } from '../hooks/useHandTracking'
import { useHandController } from '../hooks/useHandController'
import Interaction from '../components/layout/Interaction'
import Fps from '../components/layout/Fps'
import Guide from '../components/layout/Guide'
import Tracking from '../components/layout/Tracking'
import Workspace from '../components/layout/Workspace'
import CameraView from '../components/camera/CameraView'
import Notification from '../components/shared/notification/Notification'
import { useState } from 'react'
import DragConstraints from '../components/layout/DragConstraints'
import StatusBar from '../components/layout/StatusBar'

const App = () => {
  const [notification, setNotification] = useState<string | null>(null)
  const [controlMode, setControlMode] = useState<'browser' | 'desktop'>(
    'browser'
  )

  const { videoRef, status, error, startCamera, stopCamera } = useCamera()

  const {
    hands,
    fps,
    loading: isHandTrackingLoading,
    error: handTrackingError,
  } = useHandTracking({
    videoRef,
    enabled: status === 'ready',
  })

  const { cursorPosition, interaction } = useHandController({
    hands,
    controlMode,
  })

  const isTracking = status === 'ready'

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {isTracking && controlMode === 'browser' && (
        <VirtualCursor position={cursorPosition} gesture={interaction.type} />
      )}
      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <StatusBar status={status} gesture={interaction.type} FPS={fps} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <section className="min-w-0">
            <Fps fps={fps} />

            <CameraView
              videoRef={videoRef}
              status={status}
              error={error}
              hands={hands}
              isHandTrackingLoading={isHandTrackingLoading}
              handTrackingError={handTrackingError}
              onStart={startCamera}
              onStop={stopCamera}
            />
          </section>

          <aside className="flex min-w-0 flex-col gap-4">
            <Interaction
              interaction={interaction.type}
              isTracking={isTracking}
            />

            <Tracking
              hands={hands.length}
              mode={controlMode}
              onModeChange={setControlMode}
            />

            <Guide />
          </aside>
        </div>

        <section className="mt-6">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-zinc-950">
              Interactive workspace
            </h2>

            <p className="mt-0.5 text-xs text-zinc-500">
              Try your gestures on the elements below.
            </p>
          </div>

          <Workspace onNotification={setNotification} />

          <DragConstraints />
        </section>
      </main>
      <Notification
        visible={notification !== null}
        message={notification ?? ''}
      />
    </div>
  )
}

export default App
