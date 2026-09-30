import type WebSocket from "ws";
import { driver } from "./driver.js";

export const registerWebSocket = (socket: WebSocket) => {
  console.log("WebSocket client connected");

  socket.on("message", (message) => {
    const command = JSON.parse(message.toString());

    switch (command.type) {
      case "mouse.move":
        driver.moveMouse(command.x, command.y);
        break;

      case "mouse.click":
        driver.clickMouse(command.button);
        break;

      case "mouse.scroll":
        driver.scrollMouse(command.delta);
        break;

      case "mouse.drag":
        driver.dragMouse(command.x, command.y);
        break;

      case "mouse.toggle":
        driver.toggleMouse(command.state);
        break;
    }
  });

  socket.send(
    JSON.stringify({
      type: "connected",
      message: "WebSocket connected",
    }),
  );
};
