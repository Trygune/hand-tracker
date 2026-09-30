import type { Interaction, InteractionExecutor } from '@hand-tracker/core'
import { BrowserService } from './browser.service'

export class BrowserExecutor implements InteractionExecutor {
  private browserService: BrowserService

  constructor() {
    this.browserService = new BrowserService()
  }

  execute = (interaction: Interaction): void => {
    switch (interaction.type) {
      case 'left-click':
        this.browserService.leftClick(interaction.position)
        break

      case 'right-click':
        this.browserService.rightClick(interaction.position)
        break

      case 'scroll':
        if (interaction.scroll) {
          this.browserService.scroll(interaction.scroll)
        }
        break

      case 'drag':
        if (interaction.drag) {
          this.browserService.drag(interaction.position, interaction.drag)
        }
        break

      default:
        break
    }
  }
}
