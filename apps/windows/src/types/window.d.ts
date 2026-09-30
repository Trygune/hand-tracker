import { DesktopAPI } from "../shared/desktop-api";

declare global {
  interface Window {
    desktop?: DesktopAPI;
  }
}

export {};
