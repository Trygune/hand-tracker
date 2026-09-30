import { AgentCursorExecutor } from '../execution/cursor/agent.cursor'
import { AgentExecutor } from '../execution/interaction/agent/agent.executor'
import { AgentSocket } from '../execution/interaction/agent/agent.socket'
import type { DesktopBackend } from './desktop.backend'

export const createSocketBackend = (): DesktopBackend => {
  const socket = new AgentSocket()
  socket.connect()

  return {
    cursor: new AgentCursorExecutor(socket),
    interaction: new AgentExecutor(socket),
    close: () => socket.close(),
  }
}
