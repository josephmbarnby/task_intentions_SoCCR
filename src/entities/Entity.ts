import {Scene} from 'phaser';

/**
 * Entity interface
 */
export interface Entity {
  scene: Scene;
  preload(): void;
  create(): void;
}
