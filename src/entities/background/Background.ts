import { Scene } from 'phaser';
import { center, scale } from '../../camera/Scaling';

import { Entity } from '../Entity';

export class Background implements Entity {
  scene: Scene;
  key: string;
  url: string;

  constructor(scene: Scene, key: string, imageURL: string) {
    this.scene = scene;
    this.key = key;
    this.url = imageURL;
  }

  preload() {
    // Load the background image
    this.scene.load.image(this.key, this.url);
  }

  create() {
    // Place background
    const [centerX, centerY] = center(this.scene);
    const background = this.scene.add.image(centerX, centerY, 'background');

    // Scale background
    const [scaleX, scaleY] = scale(this.scene, background.width, background.height);
    background.setScrollFactor(0);
    background.setScale(scaleX, scaleY);
  }
}