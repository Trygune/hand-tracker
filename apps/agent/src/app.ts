import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerWebSocket } from "./server/websocket.js";

const app = Fastify({
  logger: true,
});

await app.register(websocket);

app.get("/", async () => {
  return {
    status: "ok",
  };
});

app.register(async (fastify) => {
  fastify.get(
    "/ws",
    {
      websocket: true,
    },
    (socket) => {
      registerWebSocket(socket);
    },
  );
});

export default app;
