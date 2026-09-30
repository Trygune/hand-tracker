# Hand Tracker

A cross-platform hand tracking and gesture control system that turns hand movements into cursor and mouse interactions.

Hand Tracker is designed as a modular system rather than a single application. The core tracking and interaction logic is separated from platform-specific execution, allowing the same logic to power a browser application, a local WebSocket agent, and a native Windows desktop application.

## Features

* Real-time hand tracking using MediaPipe
* 21-point hand landmark detection
* Gesture detection and stabilization
* Virtual cursor control
* Mouse movement
* Left and right click
* Scrolling
* Drag and drop interactions
* Browser-based control
* Native Windows mouse control
* Local WebSocket control through a desktop agent
* Electron desktop application
* Shared platform-independent Core
* Shared desktop Driver based on RobotJS
* ESM and CommonJS package builds

---

## Architecture

The project is built around a shared Core and platform-specific execution layers.

```text
                         Hand Tracker
                              │
                              ▼
                    ┌──────────────────┐
                    │   MediaPipe      │
                    │ Hand Landmarker  │
                    └────────┬─────────┘
                             │
                         Landmarks
                             │
                             ▼
                    ┌──────────────────┐
                    │      Core        │
                    │                  │
                    │ Gesture Engine   │
                    │ Cursor Engine    │
                    │ Stability        │
                    │ Interaction     │
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
              Web          Agent       Windows
                │            │            │
                ▼            ▼            ▼
       Browser Executor   WebSocket     IPC
                             │            │
                             ▼            ▼
                          Driver       Driver
                             │            │
                             └─────┬──────┘
                                   ▼
                                RobotJS
                                   │
                                   ▼
                              OS Mouse
```

The important architectural principle is:

> **Core decides what should happen. Platform-specific layers decide how it happens.**

For example, Core can determine that the user performed a click, but Core does not directly call RobotJS or browser APIs.

---

# Project Structure

```text
hand-tracker/
│
├── apps/
│   ├── web/
│   │   └── Browser application
│   │
│   ├── agent/
│   │   └── Local WebSocket desktop agent
│   │
│   └── windows/
│       └── Electron Windows application
│
├── packages/
│   ├── core/
│   │   └── Platform-independent tracking & interaction logic
│   │
│   └── driver/
│       └── Desktop mouse driver using RobotJS
│
└── README.md
```

---

# Packages

## `@hand-tracker/core`

The Core package contains the platform-independent logic of Hand Tracker.

It is responsible for:

* Gesture detection
* Gesture confidence
* Gesture stabilization
* Cursor position calculation
* Interaction state
* Interaction commands
* Browser-independent mouse abstractions

Core does **not** directly control the operating system.

It does not know about:

* Electron
* RobotJS
* Windows
* WebSocket
* DOM
* Browser APIs

This makes the Core reusable across different environments.

### Installation

```bash
npm install @hand-tracker/core
```

### Basic usage

```ts
import {
  CursorEngine,
  detectGesture,
  InteractionEngine,
} from "@hand-tracker/core";

const cursor = new CursorEngine();
const interaction = new InteractionEngine();

const position = cursor.update(landmarks);
const gesture = detectGesture(landmarks);

const result = interaction.update(gesture, position);
```

The result can then be passed to a platform-specific executor.

---

## `@hand-tracker/driver`

The Driver package provides the desktop implementation of mouse control.

It is built on top of RobotJS and translates normalized coordinates and interaction commands into real operating-system mouse actions.

Responsibilities include:

* Moving the OS mouse
* Clicking
* Scrolling
* Mouse button toggling
* Dragging

### Installation

```bash
npm install @hand-tracker/driver
```

### Usage

```ts
import { Driver } from "@hand-tracker/driver";

const driver = new Driver();

driver.moveMouse(0.5, 0.5);

driver.clickMouse("left");

driver.scrollMouse({
  x: 0,
  y: 1,
});
```

The Driver does not perform hand tracking or gesture detection.

Its responsibility is only:

```text
Command
   ↓
Driver
   ↓
RobotJS
   ↓
Operating System
```

This separation allows the same Driver to be used by both the Agent and Electron application.

---

# Applications

## Web

The Web application is the browser-based version of Hand Tracker.

It provides:

* Camera access
* MediaPipe hand tracking
* Hand landmark processing
* Gesture detection
* Virtual cursor
* Browser interactions
* Visual feedback
* Hand overlay

Architecture:

```text
Camera
  ↓
MediaPipe
  ↓
Hand Landmarks
  ↓
@hand-tracker/core
  ↓
Browser Executor
  ↓
Browser / DOM
```

The Web application does not require the local Agent for browser interactions.

### Run

```bash
cd apps/web
npm install
npm run dev
```

### Build

```bash
npm run build
```

The production build is generated in:

```text
apps/web/dist/
```

---

# Agent

## What is the Agent?

The Agent is a **local desktop process** that allows the browser application to control the operating-system mouse.

It solves an important browser limitation:

> A normal browser application cannot directly control the user's operating-system mouse.

The Agent runs locally on the user's computer and exposes a WebSocket endpoint.

The Web application sends commands to the Agent, and the Agent passes those commands to the desktop Driver.

### Architecture

```text
Web
 │
 │ WebSocket
 ▼
Agent
 │
 ▼
@hand-tracker/driver
 │
 ▼
RobotJS
 │
 ▼
Windows Mouse
```

The Agent does **not** perform hand tracking.

The browser remains responsible for:

```text
Camera
MediaPipe
Landmarks
Core
Gesture Detection
Interaction
```

The Agent is only the bridge between the browser and the operating system.

---

## Why use an Agent?

Without the Agent:

```text
Browser
   ↓
Browser APIs
```

The browser is limited to browser-level interactions.

With the Agent:

```text
Browser
   │
   │ WebSocket
   ▼
Local Agent
   │
   ▼
Native Driver
   │
   ▼
Operating System
```

This makes system-level mouse control possible while keeping the Web application independent from native desktop APIs.

---

## Agent responsibilities

The Agent is responsible for:

* Running a local HTTP/WebSocket server
* Accepting WebSocket connections
* Receiving mouse commands
* Validating/parsing incoming messages
* Passing commands to the Driver
* Sending connection status to clients

It currently exposes:

```text
GET /
GET /ws
```

The WebSocket endpoint is:

```text
ws://127.0.0.1:5000/ws
```

---

## Agent connection

When a client connects, the Agent sends:

```json
{
  "type": "connected",
  "message": "WebSocket connected"
}
```

The client can then send commands such as:

### Mouse movement

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
  "y": 0.5
}
```

### Mouse toggle

```json
{
  "type": "mouse.toggle",
  "state": "down"
}
```

The Agent then maps these commands to the Driver.

---

## Run the Agent

```bash
cd apps/agent
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Run the compiled Agent:

```bash
npm start
```

By default it listens on:

```text
http://127.0.0.1:5000
```

and the WebSocket endpoint is:

```text
ws://127.0.0.1:5000/ws
```

---

# Windows Application

The Windows application is the native desktop version of Hand Tracker.

It uses Electron and reuses the same Web UI instead of implementing a separate desktop interface.

Architecture:

```text
React UI
   │
   ▼
MediaPipe
   │
   ▼
@hand-tracker/core
   │
   ▼
Electron IPC
   │
   ▼
@hand-tracker/driver
   │
   ▼
RobotJS
   │
   ▼
Windows
```

Unlike the Agent architecture, the Windows application does not need WebSocket communication.

The renderer communicates with the Electron main process through IPC.

---

## Why doesn't Windows use the Agent?

The Agent exists to bridge:

```text
Browser → WebSocket → Native Driver
```

Electron already has access to a native main process.

Therefore Windows can use:

```text
Renderer → IPC → Driver
```

This removes an unnecessary network layer.

---

# Supported Gestures

Hand Tracker currently supports the following gestures:

| Gesture              | Action         |
| -------------------- | -------------- |
| Point                | Move cursor    |
| Index Pinch          | Left click     |
| Peace                | Scroll         |
| Index + Middle Pinch | Right click    |
| Open Palm            | Drag           |
| Fist                 | No interaction |

Gesture processing is separated from cursor movement and interaction execution.

```text
Hand Landmarks
      ↓
Gesture Detection
      ↓
Gesture Stability
      ↓
Interaction Engine
      ↓
Executor / Driver
```

---

# Cursor System

The cursor system uses the index fingertip to calculate a normalized cursor position.

The coordinate system is approximately:

```text
(0, 0) ───────────────► (1, 0)
  │
  │
  │
  ▼
(0, 1) ───────────────► (1, 1)
```

The browser and desktop layers can then translate these normalized coordinates into their respective coordinate systems.

For desktop control:

```text
Normalized coordinates
        ↓
Driver
        ↓
Screen coordinates
        ↓
RobotJS
```

---

# Hand Tracking Pipeline

The complete pipeline is:

```text
Camera
  ↓
Video Frame
  ↓
MediaPipe Hand Landmarker
  ↓
21 Hand Landmarks
  ↓
Hand Tracking
  ↓
Gesture Detection
  ↓
Gesture Stability
  ↓
Cursor Engine
  ↓
Interaction Engine
  ↓
Platform Executor
  ↓
Browser / OS
```

The Core is intentionally placed in the middle of this pipeline so that platform-specific code remains outside the main interaction logic.

---

# MediaPipe

The project uses:

```text
@mediapipe/tasks-vision
```

with:

```text
HandLandmarker
```

The model contains 21 landmarks per detected hand.

Important landmarks include:

```text
Thumb tip      → 4
Index tip      → 8
Middle tip     → 12
Ring tip       → 16
Pinky tip      → 20
```

The project currently uses:

```text
Running mode: VIDEO
Hands: 1
Detection confidence: 0.5
Presence confidence: 0.5
Tracking confidence: 0.5
```

The hand landmark model is stored as:

```text
public/models/hand_landmarker.task
```

and is included in the production renderer build.

---

# Gesture Stability

Raw hand landmark data can fluctuate between frames.

For that reason, gesture detection is followed by a stability layer.

Conceptually:

```text
Frame 1 → Point
Frame 2 → Point
Frame 3 → Point
             ↓
         Stable Point
```

This prevents small landmark fluctuations from causing unwanted interaction changes.

The current system uses a multi-frame stability mechanism before accepting gesture changes.

---

# Platform Separation

One of the main design goals of the project is separating **decision-making** from **execution**.

For example:

```text
Core:

"User performed a left click."
```

does not mean:

```text
Core → robot.mouseClick()
```

Instead:

```text
Core
 ↓
Interaction Result
 ↓
Platform Executor
```

The Web application can execute that result through browser APIs.

The Windows application can send it through Electron IPC.

The Agent can send it through the Driver.

This makes the Core reusable.

---

# Web vs Agent vs Windows

| Component | Purpose                      | Native Mouse | WebSocket |
| --------- | ---------------------------- | -----------: | --------: |
| Web       | Browser hand-tracking UI     |           No |  Optional |
| Agent     | Browser → OS bridge          |          Yes |       Yes |
| Windows   | Native desktop application   |          Yes |        No |
| Core      | Tracking & interaction logic |           No |        No |
| Driver    | OS mouse execution           |          Yes |        No |

---

# Development

Clone the repository and install dependencies for the required application/package.

Example:

```bash
cd apps/web
npm install
npm run dev
```

For the Agent:

```bash
cd apps/agent
npm install
npm run dev
```

For Windows:

```bash
cd apps/windows
npm install
npm start
```

---

# Windows Packaging

The Windows application is packaged using Electron Forge.

Build the TypeScript code:

```bash
npm run build
```

Create the distributable:

```bash
npx electron-forge make
```

The generated artifacts are placed in:

```text
apps/windows/out/
```

The current Windows distribution is generated as a ZIP containing the complete Electron application.

The `.exe` should not be distributed by itself because Electron requires its accompanying resources, DLLs, Chromium files, and application resources.

---

# Build Flow

The current production flow is:

```text
apps/web
   │
   │ npm run build
   ▼
web/dist
   │
   │ copy renderer
   ▼
apps/windows/dist/renderer
   │
   ▼
TypeScript build
   │
   ▼
Electron Forge
   │
   ▼
Windows ZIP
```

The renderer build includes:

```text
index.html
assets/
models/
```

The `base` configuration is relative so the same production UI can be loaded by Electron using `file://`.

---

# Security Model

The Windows Electron application uses:

```text
contextIsolation: true
nodeIntegration: false
```

Native functionality is exposed through Electron IPC rather than giving the renderer direct Node.js access.

The intended architecture is:

```text
Renderer
   │
   │ IPC
   ▼
Electron Main
   │
   ▼
Native Driver
```

The Agent binds to:

```text
127.0.0.1
```

rather than exposing its WebSocket server to the local network by default.

---

# Technology Stack

### Core

* TypeScript
* ESM / CommonJS
* Platform-independent architecture

### Web

* React
* TypeScript
* Vite
* Tailwind CSS
* MediaPipe Tasks Vision
* Motion
* Lucide

### Agent

* Node.js
* TypeScript
* Fastify
* `@fastify/websocket`
* WebSocket
* `@hand-tracker/driver`

### Windows

* Electron
* TypeScript
* Electron Forge
* Electron IPC
* `@hand-tracker/core`
* `@hand-tracker/driver`

### Desktop Driver

* RobotJS
* TypeScript

---

# Repository Philosophy

The project intentionally avoids putting platform-specific functionality into the Core.

The goal is to keep the system extensible:

```text
                    @hand-tracker/core
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            Web           Agent         Windows
             │              │              │
         Browser        Driver          IPC
                            │              │
                            └──────┬───────┘
                                   │
                                RobotJS
```

This makes it possible to add additional clients or execution targets without rewriting the hand tracking and gesture system.

Potential future integrations could include:

* Additional desktop platforms
* Alternative mouse drivers
* Additional input devices
* Remote control clients
* SDK integrations
* Additional gesture detectors

---

# Package Ecosystem

The two reusable packages are:

* `@hand-tracker/core` — tracking, gestures, cursor and interaction logic
* `@hand-tracker/driver` — native desktop mouse execution

The applications consume these packages rather than duplicating their functionality.

---

# License

MIT License

Copyright (c) 2026 Farbod DaneshmandFard
