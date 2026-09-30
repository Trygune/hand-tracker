type DragState = "idle" | "dragging";

export class DragStateManager {
  private state: DragState = "idle";

  start = (): void => {
    if (this.state === "idle") {
      this.state = "dragging";
    }
  };

  end = (): void => {
    this.state = "idle";
  };

  getState = (): DragState => {
    return this.state;
  };

  reset = (): void => {
    this.state = "idle";
  };
}
