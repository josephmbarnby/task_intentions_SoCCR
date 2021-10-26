import { Scene } from 'phaser';

import { Entity } from '../Entity';

export class Background implements Entity {
  scene: Scene;
  url: string;

  constructor(scene: Scene, imageURL: string) {
    this.scene = scene;
    this.url = imageURL;
  }
}