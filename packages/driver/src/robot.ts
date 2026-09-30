import robot from "robotjs";
import type { MouseButton, ScrollDelta } from "@hand-tracker/core";
import type { MouseDriver } from "./types.js";

export class Driver implements MouseDriver {
  private screen = robot.getScreenSize();

  constructor() {
    robot.setMouseDelay(0);
  }

  private toScreenCoords = (x: number, y: number) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const { width, height } = this.screen;

    const screenX = Math.min(width - 1, Math.max(0, x * width));

    const screenY = Math.min(height - 1, Math.max(0, y * height));
    return {
      x: Math.round(screenX),
      y: Math.round(screenY),
    };
  };

  moveMouse = (x: number, y: number): void => {
    const p = this.toScreenCoords(x, y);
    if (!p) return;
    robot.moveMouse(p.x, p.y);
  };

  clickMouse = (button: MouseButton): void => {
    robot.mouseClick(button);
  };

  scrollMouse = (delta: ScrollDelta): void => {
    const y = 1 - delta.y;
    robot.scrollMouse(0, y);
  };

  toggleMouse = (state: "down" | "up"): void => {
    robot.mouseToggle(state);
  };

  dragMouse = (x: number, y: number): void => {
    const p = this.toScreenCoords(x, y);
    if (!p) return;
    robot.dragMouse(p.x, p.y);
  };
}
