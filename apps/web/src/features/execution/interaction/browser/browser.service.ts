import type { CursorPosition, ScrollDelta } from '@hand-tracker/core'
import { normalizedToViewport } from '../../../../lib/geometry/viewport'

export class BrowserService {
  private draggedElement: HTMLElement | null = null

  getElementAtPosition = (position: CursorPosition): Element | null => {
    const viewportPosition = normalizedToViewport(position)

    return document.elementFromPoint(viewportPosition.x, viewportPosition.y)
  }

  leftClick = (position: CursorPosition): void => {
    const element = this.getElementAtPosition(position)

    if (!element) {
      return
    }

    if (element instanceof HTMLElement) {
      element.click()
    }
  }

  rightClick = (position: CursorPosition): void => {
    const element = this.getElementAtPosition(position)

    if (!element) {
      return
    }

    element.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 2,
      })
    )
  }

  scroll = (delta: ScrollDelta): void => {
    window.scrollBy({
      left: delta.x,
      top: delta.y,
    })
  }

  drag = (position: CursorPosition, type: 'start' | 'move' | 'end'): void => {
    const x = position.x * window.innerWidth
    const y = position.y * window.innerHeight

    if (type === 'start') {
      const element = this.getElementAtPosition(position)

      if (!(element instanceof HTMLElement)) {
        return
      }

      this.draggedElement = element

      element.dispatchEvent(
        new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: x,
          clientY: y,
          button: 0,
          buttons: 1,
        })
      )

      return
    }

    if (type === 'move') {
      if (!this.draggedElement) {
        return
      }

      this.draggedElement.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: x,
          clientY: y,
          button: 0,
          buttons: 1,
        })
      )

      return
    }

    if (!this.draggedElement) {
      return
    }

    this.draggedElement.dispatchEvent(
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: 0,
      })
    )

    this.draggedElement = null
  }
}
