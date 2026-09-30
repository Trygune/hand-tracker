import type { ViewportPosition } from '@hand-tracker/core'

export const normalizedToViewport = (position: {
  x: number
  y: number
}): ViewportPosition => {
  return {
    x: position.x * window.innerWidth,
    y: position.y * window.innerHeight,
  }
}
