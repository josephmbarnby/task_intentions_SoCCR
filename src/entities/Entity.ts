import { Scene } from "phaser";

export interface Entity {
  scene: Scene;
  preload(): void;
  create(): void;
}