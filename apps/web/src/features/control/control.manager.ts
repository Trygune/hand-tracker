import type { CursorPosition, Interaction } from '@hand-tracker/core'
import type { BrowserControl } from './browser/browser.control'
import type { ControlMode } from './control.types'
import type { DesktopControl } from './desktop/desktop.control'

export class ControlManager {
  private currentMode: ControlMode = 'browser'
  private browser: BrowserControl
  private desktop: DesktopControl

  constructor(browser: BrowserControl, desktop: DesktopControl) {
    this.browser = browser
    this.desktop = desktop
    this.browser.enable()
  }

  execute = (
    mode: ControlMode,
    position: CursorPosition,
    interaction: Interaction
  ): boolean => {
    if (mode !== this.currentMode) {
      this.changeMode(mode)
    }

    if (mode === 'browser') {
      this.browser.execute(position, interaction)

      return true
    }

    this.desktop.execute(position, interaction)
    return false
  }

  private changeMode = (mode: ControlMode): void => {
    if (mode === 'desktop') {
      this.browser.disable()
      this.desktop.enable()
    }

    if (mode === 'browser') {
      this.desktop.disable()
      this.browser.enable()
    }

    this.currentMode = mode
  }
}
