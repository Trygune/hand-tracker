import type { CursorExecutor, CursorPosition } from '@hand-tracker/core'

export class IpcCursorExecutor implements CursorExecutor {
  move = (position: CursorPosition): void => {
    window.desktop?.moveCursor(position)
  }

  drag = (position: CursorPosition): void => {
    window.desktop?.dragCursor(position)
  }
}
