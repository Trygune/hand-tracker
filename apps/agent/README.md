# Hand Tracker Agent

Local WebSocket agent for [Hand Tracker](https://github.com/Trygune/hand-tracker).

The Agent receives mouse commands over WebSocket and forwards them to the desktop through `@hand-tracker/driver`.

## Architecture

```text
Browser / Client
      │
      │ WebSocket
      ▼
┌─────────────────┐
│  Hand Tracker   │
│      Agent      │
└────────┬────────┘
         │
         ▼
@hand-tracker/driver
         │
         ▼
      RobotJS
         │
         ▼
      OS Mouse
```

The Agent does not handle hand tracking or gesture detection.

Those responsibilities belong to `@hand-tracker/core`.

## Features

* Local WebSocket server
* Mouse movement
* Mouse clicks
* Mouse scrolling
* Mouse dragging
* Mouse button toggle
* Built with Fastify
* Uses `@hand-tracker/driver` for desktop control

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the Agent in development mode:

```bash
npm run dev
```

The server runs on:

```text
ws://127.0.0.1:5000/ws
```

## Production

Build the Agent:

```bash
npm run build
```

Start the compiled version:

```bash
npm start
```

The default server address is:

```text
http://127.0.0.1:5000
```

The WebSocket endpoint is:

```text
ws://127.0.0.1:5000/ws
```

## WebSocket Commands

The Agent accepts JSON commands through the WebSocket connection.

### Move mouse

Coordinates are normalized between `0` and `1`.

```json
{
  "type": "mouse.move",
  "x": 0.5,
  "y": 0.5
}
```

### Click

```json
{
  "type": "mouse.click",
  "button": "left"
}
```

Supported buttons depend on the underlying driver.

### Scroll

```json
{
  "type": "mouse.scroll",
  "delta": {
    "x": 0,
    "y": 1
  }
}
```

### Drag

```json
{
  "type": "mouse.drag",
  "x": 0.6,
  "y": 0.4
}
```

### Mouse toggle

Used to press or release a mouse button:

```json
{
  "type": "mouse.toggle",
  "state": "down"
}
```

or:

```json
{
  "type": "mouse.toggle",
  "state": "up"
}
```

## Connection Response

When a client connects, the Agent sends:

```json
{
  "type": "connected",
  "message": "WebSocket connected"
}
```

## Project Structure

```text
apps/agent/
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── server/
│       ├── driver.ts
│       └── websocket.ts
├── package.json
└── tsconfig.json
```

### `app.ts`

Creates and configures the Fastify application and registers the WebSocket endpoint.

### `server.ts`

Starts the Fastify server.

### `server/websocket.ts`

Handles WebSocket connections and translates incoming commands into driver operations.

### `server/driver.ts`

Creates the desktop driver instance:

```ts
import { Driver } from "@hand-tracker/driver";

export const driver = new Driver();
```

## Relationship with Core

The Agent is intentionally separate from `@hand-tracker/core`.

```text
@hand-tracker/core
        │
        │ position + interaction
        ▼
      Client
        │
        │ WebSocket commands
        ▼
      Agent
        │
        ▼
     Driver
        │
        ▼
      RobotJS
```

`@hand-tracker/core` contains platform-independent hand tracking and interaction logic.

The Agent is responsible only for receiving commands and executing them on the local desktop.

## Security

The Agent currently listens on:

```text
127.0.0.1
```

This means it accepts connections only from the local machine.

It is not currently designed to be exposed directly to the public internet.

## Related Packages

* `@hand-tracker/core` — platform-independent tracking, gesture, cursor, and interaction logic
* `@hand-tracker/driver` — desktop mouse driver powered by RobotJS
* `hand-tracker-agent` — local WebSocket runtime connecting clients to the desktop driver

## License

MIT
