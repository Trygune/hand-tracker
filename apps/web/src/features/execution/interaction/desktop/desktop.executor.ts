import type { Interaction } from '@hand-tracker/core'

export class IpcExecutor {
  execute = (interaction: Interaction): void => {
    switch (interaction.type) {
      case 'left-click':
        window.desktop?.clickCursor('left')
        break

      case 'right-click':
        window.desktop?.clickCursor('right')
        break

      case 'scroll':
        window.desktop?.scrollCursor(interaction.scroll)
        break

      case 'drag':
        if (interaction.drag === 'start') {
          window.desktop?.toggleCursor('down')
        }
        if (interaction.drag === 'end') {
          window.desktop?.toggleCursor('up')
        }
        break

      default:
        break
    }
  }
}
