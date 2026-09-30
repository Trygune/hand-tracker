# Hand Tracker Web

A browser-based hand tracking and gesture control interface built with React, Vite, MediaPipe, and `@hand-tracker/core`.

The web application uses your webcam to detect hand landmarks, recognize gestures, and translate them into browser interactions.

## Demo

Live demo:

https://hand-tracker-web.vercel.app

> Replace the URL above with the actual Vercel deployment URL.

## Features

* Real-time hand tracking through the webcam
* 21-point hand landmark detection
* Gesture recognition
* Virtual cursor control
* Browser scrolling
* Click interactions
* Drag interactions
* Visual hand landmark overlay
* Real-time interaction feedback

## Supported Gestures

| Gesture           | Action          |
| ----------------- | --------------- |
| ☝️ Point          | Cursor movement |
| 🤏 Index Pinch    | Click           |
| ✌️ Peace          | Scroll          |
| 🤏 Index + Middle | Right click     |
| 🖐️ Open Palm     | Drag            |
| ✊ Fist            | No interaction  |

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* MediaPipe Tasks Vision
* `@hand-tracker/core`
* Motion
* Lucide React

## How It Works

The browser application uses a camera-to-interaction pipeline:

```text
Webcam
  ↓
MediaPipe Hand Landmarker
  ↓
Hand Landmarks
  ↓
@hand-tracker/core
  ↓
Gesture / Interaction
  ↓
Browser Control
```

`@hand-tracker/core` contains the platform-independent hand tracking logic, gesture detection, cursor calculations, and interaction processing.

The Web application is responsible for connecting that logic to the browser.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development server.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production output is generated in:

```text
dist/
```

## Browser Permissions

The application requires access to your webcam.

When prompted by the browser, allow camera access.

Camera processing happens in the browser using MediaPipe.

## Project Structure

```text
web/
├── src/
│   ├── app/
│   ├── features/
│   └── ...
├── public/
├── package.json
└── vite.config.ts
```

The application is intentionally kept separate from the core hand-tracking logic.

```text
@hand-tracker/core
        ↓
      Web
        ↓
   Browser APIs
```

## Related Packages

### `@hand-tracker/core`

Platform-independent hand tracking, gesture detection, cursor, and interaction logic.

### `@hand-tracker/driver`

Desktop mouse driver using RobotJS.

```text
                    Hand Tracker
                         │
             ┌───────────┴───────────┐
             │                       │
            Web                   Desktop
             │                       │
             ↓                       ↓
          Browser              Electron / Driver
             │                       │
             └───────────┬───────────┘
                         ↓
                  @hand-tracker/core
```

## Status

This project is under active development.

The web version is primarily used as the browser-based interface and demonstration environment for the Hand Tracker system.

## License

MIT
