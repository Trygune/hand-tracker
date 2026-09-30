export {}

declare global {
  interface Window {
    desktop?: {
      moveCursor: (p: { x: number; y: number }) => void
      clickCursor: (b: 'left' | 'right') => void
      scrollCursor: (d?: { x: number; y: number }) => void
      toggleCursor: (s?: 'down' | 'up') => void
      dragCursor: (p?: { x: number; y: number }) => void
    }
  }
}
