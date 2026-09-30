# @hand-tracker/core

Platform-independent core logic for the Hand Tracker project.

`@hand-tracker/core` contains the logic for processing hand landmarks, detecting gestures, calculating cursor movement, and producing interactions. It does **not** directly control the mouse or depend on a specific platform.

## Installation

```bash
npm install @hand-tracker/core
```

## What is Core?

The Core package handles the platform-independent part of the hand-tracking pipeline:

```text
Hand Landmarks
      ↓
Finger Analysis
      ↓
Gesture Detection
      ↓
Interaction Detection
      ↓
Cursor Position
      ↓
Commands / Actions
```

Core determines:

* where the hand and cursor are
* which gesture is being performed
* which interaction was detected
* what command or action should be produced

Core does **not** determine how the command is executed.

For example:

```text
Core
 ↓
Cursor / Interaction result
 ↓
Web
 ↓
Browser DOM
```

or:

```text
Core
 ↓
Cursor / Interaction result
 ↓
Electron IPC
 ↓
Desktop executor
 ↓
Mouse
```

This keeps the core logic reusable across different environments.

---

## Supported Gestures

The current gesture system supports:

| Gesture                 | Purpose         |
| ----------------------- | --------------- |
| ☝️ Point                | Cursor movement |
| 🤏 Index Pinch          | Left Click           |
| ✌️ Peace                | Scroll          |
| 🤘 Rock | Right click     |
| 🖐️ Open Palm           | Drag            |
| ✊ Fist                  | No interaction  |

Gesture detection is handled by:

```ts
import { detectGesture } from "@hand-tracker/core";
```

---

## Basic Usage

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

The Core package produces the information required by the application layer. The consuming application is responsible for deciding how to execute the resulting actions.

---

## Cursor

`CursorEngine` converts hand landmark information into a normalized cursor position.

```ts
import { CursorEngine } from "@hand-tracker/core";

const cursor = new CursorEngine();

const position = cursor.update(landmarks);
```

The returned position can then be used by a platform-specific cursor implementation.

---

## Gesture Detection

Use `detectGesture` to detect the current hand gesture.

```ts
import { detectGesture } from "@hand-tracker/core";

const gesture = detectGesture(landmarks);
```

For more stable gesture recognition, `GestureStability` can be used to prevent short-lived frame-to-frame changes from immediately becoming interactions.

```ts
import { GestureStability } from "@hand-tracker/core";

const stability = new GestureStability();
```

---

## Interaction

`InteractionEngine` converts detected gestures into higher-level interactions.

```ts
import { InteractionEngine } from "@hand-tracker/core";

const interaction = new InteractionEngine();

const result = interaction.update(gesture, position);
```

Interactions can represent actions such as:

* point
* click
* drag
* scroll
* select

---

## Executors

Core defines executor interfaces/classes for connecting the generated commands to an actual environment.

### Cursor Executor

```ts
import { CursorExecutor } from "@hand-tracker/core";
```

### Browser Cursor Executor

```ts
import { BrowserCursorExecutor } from "@hand-tracker/core";
```

### Interaction Executor

```ts
import { InteractionExecutor } from "@hand-tracker/core";
```

The executor layer keeps execution separate from gesture and interaction logic.

---

## Types

The package also exports the main types used by the public API.

```ts
import type {
  HandLandmark,
  CursorPosition,
  ViewportPosition,
  InteractionType,
  ScrollDelta,
  Interaction,
  MouseButton,
} from "@hand-tracker/core";
```

These types allow applications to integrate Core while keeping the implementation strongly typed.

---

## Architecture

The package is organized around independent parts of the hand-control pipeline:

```text
                    Hand Landmarks
                          │
                          ▼
                  Finger Analysis
                          │
                          ▼
                  Gesture Detection
                          │
                          ▼
                 Gesture Stability
                          │
                          ▼
                 Interaction Engine
                    ┌─────┴─────┐
                    ▼           ▼
              Cursor Engine   Actions
                    │           │
                    └─────┬─────┘
                          ▼
                     Executors
```

The important separation is between **decision-making** and **execution**.

Core decides what should happen.

The consuming application decides how that action should happen on the target platform.

---

## Platform Independence

The package does not depend on:

* React
* Vite
* Electron
* MediaPipe
* Browser-specific UI components

This allows the same Core logic to be consumed by different applications.

For example:

```text
                    @hand-tracker/core
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
            Web                        Windows
             │                           │
        Browser DOM                 Electron IPC
                                         │
                                   Desktop Executor
```

---

## Module Support

The package provides both ESM and CommonJS builds.

### ESM

```ts
import { CursorEngine } from "@hand-tracker/core";
```

### CommonJS

```js
const { CursorEngine } = require("@hand-tracker/core");
```

TypeScript declarations are included with the package.

---

## Package Structure

The source code is organized by responsibility:

```text
src/
├── commands/
├── cursor/
├── execution/
│   ├── cursor/
│   └── interaction/
├── finger/
│   └── pinch/
├── geometry/
├── gestures/
│   └── detectors/
├── hand-tracking/
└── interaction/
    ├── actions/
    ├── detectors/
    ├── engines/
    └── state/
```

This structure keeps low-level hand analysis, gesture detection, interaction logic, cursor handling, and execution separate.

---

## Development

Build both ESM and CommonJS versions:

```bash
npm run build
```

The generated files are placed in:

```text
dist/
├── esm/
└── cjs/
```

## License

MIT
