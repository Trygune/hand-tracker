import type { Interaction } from '@hand-tracker/core'
import type { AgentSocket } from './agent.socket'

export class AgentExecutor {
  private readonly socket: AgentSocket

  constructor(socket: AgentSocket) {
    this.socket = socket
  }

  execute = (interaction: Interaction): void => {
    switch (interaction.type) {
      case 'left-click':
        this.socket.send({
          type: 'mouse.click',
          button: 'left',
        })
        break

      case 'right-click':
        this.socket.send({
          type: 'mouse.click',
          button: 'right',
        })
        break

      case 'scroll':
        this.socket.send({
          type: 'mouse.scroll',
          delta: interaction.scroll,
        })
        break

      case 'drag':
        if (interaction.drag === 'start') {
          this.socket.send({ type: 'mouse.toggle', state: 'down' })
        }
        if (interaction.drag === 'end') {
          this.socket.send({ type: 'mouse.toggle', state: 'up' })
        }
        break

      default:
        break
    }
  }
}
