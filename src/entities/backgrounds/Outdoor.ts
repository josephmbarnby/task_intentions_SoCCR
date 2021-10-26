import {Scene} from 'phaser';
import {center, scale} from '../../camera/Scaling';

import {Entity} from '../Entity';

/**
 * Outdoor Entity
 */
export class Outdoor implements Entity {
  scene: Scene;
  key: string;
  url: string;

  /**
   * Default constructor
   * @param {Scene} scene Phaser scene
   * @param {string} key unique identifier
   * @param {string} imageURL URL of asset
   */
  constructor(scene: Scene, key: string, imageURL: string) {
    this.scene = scene;
    this.key = key;
    this.url = imageURL;
  }

  /**
   * Preload
   */
  preload(): void {
    // Load the background image
    this.scene.load.image(this.key, this.url);
  }

  /**
   * Create
   */
  create(): void {
    // Place background
    const [centerX, centerY] = center(this.scene);
    const background = this.scene.add.image(centerX, centerY, this.key);

    // Scale background
    const [scaleX, scaleY] =
        scale(this.scene, background.width, background.height);
    background.setScrollFactor(0);
    background.setScale(scaleX, scaleY);
  }
}
