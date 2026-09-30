import {
  BrowserCursorExecutor,
  type CursorPosition,
  type Interaction,
} from '@hand-tracker/core'
import { BrowserExecutor } from '../../execution/interaction/browser/browser.executor'

export class BrowserControl {
  private executor: BrowserExecutor | null = null
  private cursor: BrowserCursorExecutor | null = null

  enable = (): void => {
    if (this.cursor && this.executor) {
      return
    }

    this.cursor = new BrowserCursorExecutor()
    this.executor = new BrowserExecutor()
  }

  disable = (): void => {
    this.cursor = null
    this.executor = null
  }

  execute = (position: CursorPosition, interaction: Interaction): void => {
    if (!this.cursor || !this.executor) {
      return
    }

    this.cursor.move(position)
    this.executor.execute(interaction)
  }
}
