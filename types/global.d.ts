import type { LevelData } from "./paychangu";

export {};

declare global {
  interface Window {
    PaychanguCheckout?: (config: LevelData) => void;
  }
}
