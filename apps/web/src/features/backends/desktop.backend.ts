import type { CursorExecutor, Interaction } from '@hand-tracker/core'

export interface DesktopBackend {
  cursor: CursorExecutor
  interaction: { execute(interaction: Interaction): void }
  close(): void
}
