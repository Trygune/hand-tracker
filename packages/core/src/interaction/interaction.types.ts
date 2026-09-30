import type { CursorPosition } from "../cursor/cursor.types.js";

export type InteractionType =
  | "none"
  | "left-click"
  | "right-click"
  | "drag"
  | "scroll"
  | "mouse"
  | "select";

type DragAction = "start" | "move" | "end";

export type ScrollDelta = {
  x: number;
  y: number;
};

export type Interaction = {
  type: InteractionType;
  position: CursorPosition;
  drag?: DragAction;
  scroll?: ScrollDelta;
};
