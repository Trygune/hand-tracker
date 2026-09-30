import type { MouseButton, ScrollDelta } from "@hand-tracker/core";

export interface MouseDriver {
  moveMouse(x: number, y: number): void;
  clickMouse(button: MouseButton): void;
  scrollMouse(delta: ScrollDelta): void;
  toggleMouse(state: "down" | "up"): void;
  dragMouse(x: number, y: number): void;
}
