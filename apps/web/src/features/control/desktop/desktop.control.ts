import type { CursorPosition, Interaction } from '@hand-tracker/core'
import type { DesktopBackend } from '../../backends/desktop.backend'

export class DesktopControl {
  private readonly createBackend: () => DesktopBackend
  private backend: DesktopBackend | null = null

  constructor(createBackend: () => DesktopBackend) {
    this.createBackend = createBackend
  }

  enable = () => {
    if (this.backend) return
    this.backend = this.createBackend()
  }

  disable = () => {
    this.backend?.close()
    this.backend = null
  }

  execute = (position: CursorPosition, interaction: Interaction): void => {
    if (!this.backend) return

    const isDragging = interaction.type === 'drag'

    if (isDragging) {
      if (interaction.drag === 'move') {
        this.backend.cursor.drag(position)
      }
    } else {
      this.backend.cursor.move(position)
    }

    this.backend.interaction.execute(interaction)
  }

  get available(): boolean {
    return this.backend !== null
  }
}
