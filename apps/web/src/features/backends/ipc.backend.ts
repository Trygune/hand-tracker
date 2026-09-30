import type { DesktopBackend } from './desktop.backend'
import { IpcCursorExecutor } from '../execution/cursor/desktop.cursor'
import { IpcExecutor } from '../execution/interaction/desktop/desktop.executor'

export const createIpcBackend = (): DesktopBackend => ({
  cursor: new IpcCursorExecutor(),
  interaction: new IpcExecutor(),
  close: () => {},
})
