import { Scene } from 'phaser';
import { center, scale } from '../../camera/Scaling';

import { Entity } from '../Entity';

export class Robot implements Entity {
  scene: Scene;
  key: string;
  url: string;

  constructor(scene: Scene, key: string, imageURL: string) {
    this.scene = scene;
    this.key = key;
    this.url = imageURL;
  }

  preload(): void {
    // Load the image image
    this.scene.load.image(this.key, this.url);
  }

  create(): void {
    // Place robot
    const [centerX, centerY] = center(this.scene);
    const robot = this.scene.add.image(centerX / 2, centerY * 1.2, this.key);

    // Scale robot
    robot.setScrollFactor(0);
    robot.setScale(0.3, 0.3);
  }
}