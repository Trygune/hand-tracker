import type { AgentSocket } from '../interaction/agent/agent.socket'
import type { CursorExecutor, CursorPosition } from '@hand-tracker/core'

export class AgentCursorExecutor implements CursorExecutor {
  private readonly socket: AgentSocket

  constructor(socket: AgentSocket) {
    this.socket = socket
  }

  move = (position: CursorPosition): void => {
    this.socket.send({
      type: 'mouse.move',
      x: position.x,
      y: position.y,
    })
  }

  drag = (position: CursorPosition): void => {
    this.socket.send({
      type: 'mouse.drag',
      drag: 'move',
      x: position.x,
      y: position.y,
    })
  }
}
