import type {
  CursorPosition,
  MouseButton,
  ScrollDelta,
} from "@hand-tracker/core";

export interface DesktopAPI {
  moveCursor: (position: CursorPosition) => void;
  clickCursor: (button: MouseButton) => void;
  scrollCursor: (delta: ScrollDelta) => void;
  toggleCursor: (state: "down" | "up") => void;
  dragCursor: (position: CursorPosition) => void;
}
