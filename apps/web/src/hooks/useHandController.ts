import { useEffect, useRef, useState } from 'react'
import { ControlManager } from '../features/control/control.manager'
import { BrowserControl } from '../features/control/browser/browser.control'
import { DesktopControl } from '../features/control/desktop/desktop.control'
import {
  CursorEngine,
  detectGesture,
  GestureStability,
  InteractionEngine,
  type CursorPosition,
  type HandLandmark,
  type Interaction,
} from '@hand-tracker/core'
import { createIpcBackend } from '../features/backends/ipc.backend'
import { createSocketBackend } from '../features/backends/socket.backend'

type UseHandControllerProps = {
  hands: HandLandmark[][]
  controlMode: 'browser' | 'desktop'
}

export const useHandController = ({
  hands,
  controlMode,
}: UseHandControllerProps) => {
  const gestureStabilityRef = useRef<GestureStability | null>(null)
  const cursorEngineRef = useRef<CursorEngine | null>(null)
  const interactionEngineRef = useRef<InteractionEngine | null>(null)

  const controlManagerRef = useRef<ControlManager | null>(null)

  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0.5,
    y: 0.5,
  })

  const [interaction, setInteraction] = useState<Interaction>({
    type: 'none',
    position: {
      x: 0.5,
      y: 0.5,
    },
  })

  useEffect(() => {
    const browserControl = new BrowserControl()

    const desktopControl = new DesktopControl(
      window.desktop ? createIpcBackend : createSocketBackend
    )

    gestureStabilityRef.current = new GestureStability()
    cursorEngineRef.current = new CursorEngine()
    interactionEngineRef.current = new InteractionEngine()

    controlManagerRef.current = new ControlManager(
      browserControl,
      desktopControl
    )

    return () => {
      gestureStabilityRef.current?.reset()
      cursorEngineRef.current?.reset()
      interactionEngineRef.current?.reset()

      gestureStabilityRef.current = null
      cursorEngineRef.current = null
      interactionEngineRef.current = null

      controlManagerRef.current = null

      desktopControl.disable()
    }
  }, [])

  useEffect(() => {
    const hand = hands[0]

    if (!hand) {
      gestureStabilityRef.current?.reset()
      interactionEngineRef.current?.reset()

      return
    }

    const gestureStability = gestureStabilityRef.current
    const cursorEngine = cursorEngineRef.current
    const interactionEngine = interactionEngineRef.current
    const controlManager = controlManagerRef.current

    if (
      !gestureStability ||
      !cursorEngine ||
      !interactionEngine ||
      !controlManager
    ) {
      return
    }

    const rawGesture = detectGesture(hand)

    const stableGesture = gestureStability.update(rawGesture.gesture)

    const position =
      stableGesture === 'point' || stableGesture === 'open-hand'
        ? cursorEngine.update(hand)
        : cursorEngine.getPosition()

    const nextInteraction = interactionEngine.update(
      stableGesture,
      hand,
      position
    )

    const shouldUpdateBrowserCursor = controlManager.execute(
      controlMode,
      position,
      nextInteraction
    )

    if (shouldUpdateBrowserCursor) {
      setCursorPosition(position)
    }

    setInteraction(nextInteraction)
  }, [hands, controlMode])

  return {
    cursorPosition,
    interaction,
  }
}
