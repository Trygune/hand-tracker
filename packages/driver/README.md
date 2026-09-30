# @hand-tracker/driver

Desktop mouse driver for [Hand Tracker](https://github.com/Trygune/hand-tracker), powered by [RobotJS](https://github.com/octalmage/robotjs).

`@hand-tracker/driver` is the platform-specific execution layer responsible for controlling the system mouse.

It does not detect hands or gestures. It receives mouse actions and executes them through RobotJS.

## Installation

```bash
npm install @hand-tracker/driver
```

## Usage

```ts
import { Driver } from "@hand-tracker/driver";

const driver = new Driver();

driver.moveMouse(0.5, 0.5);
driver.clickMouse("left");
driver.scrollMouse({ x: 0, y: 1 });
```

Coordinates passed to `moveMouse` and `dragMouse` are normalized between `0` and `1`.

```ts
driver.moveMouse(0.5, 0.5);
```

`0, 0` represents the top-left of the screen, while `1, 1` represents the bottom-right.

## API

### `Driver`

#### `moveMouse(x, y)`

Moves the system mouse to a normalized screen position.

```ts
driver.moveMouse(0.5, 0.5);
```

#### `clickMouse(button)`

Clicks a mouse button.

```ts
driver.clickMouse("left");
driver.clickMouse("right");
```

Supported buttons are provided by `@hand-tracker/core`.

#### `scrollMouse(delta)`

Scrolls the mouse using a scroll delta.

```ts
driver.scrollMouse({
  x: 0,
  y: 1,
});
```

#### `toggleMouse(state)`

Presses or releases the mouse button.

```ts
driver.toggleMouse("down");
driver.toggleMouse("up");
```

This is useful for interactions such as dragging.

#### `dragMouse(x, y)`

Moves the mouse while holding the current mouse button state.

```ts
driver.dragMouse(0.7, 0.5);
```

## Architecture

The Driver is intentionally separated from the hand-tracking and gesture logic.

```text
Hand Landmarks
      ↓
@hand-tracker/core
      ↓
Gesture / Interaction
      ↓
Mouse Command
      ↓
@hand-tracker/driver
      ↓
RobotJS
      ↓
System Mouse
```

Core is responsible for understanding **what should happen**.

Driver is responsible for making it happen on the desktop.

## Example

A simplified integration with `@hand-tracker/core` can look like:

```ts
import {
  CursorEngine,
  InteractionEngine,
  detectGesture,
} from "@hand-tracker/core";

import { Driver } from "@hand-tracker/driver";

const cursor = new CursorEngine();
const interaction = new InteractionEngine();
const driver = new Driver();

const position = cursor.update(landmarks);
const gesture = detectGesture(landmarks);

const result = interaction.update(gesture, position);

// Execute the resulting interaction with the desktop driver.
```

The exact command mapping is handled by the application layer.

## Platform

`@hand-tracker/driver` is intended for desktop environments where RobotJS can control the system mouse.

It is **not** a browser-only package.

For browser environments, use the appropriate browser execution layer instead of this package.

## Relationship with Core

```text
@hand-tracker/core
    ↓
Platform-independent logic
    ↓
@hand-tracker/driver
    ↓
Desktop mouse control
```

This separation allows the core hand-tracking logic to be reused across different environments without coupling it to a specific desktop automation library.

## License

MIT
