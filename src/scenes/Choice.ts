import Phaser from 'phaser';
import { Assets } from '../assets';
import { Background } from '../entities/background/Background';
import { Entity } from '../entities/Entity';

export default class Choice extends Phaser.Scene {
  private entities: Entity[];

  constructor() {
    super('GameScene');

    // Initialise empty collection of Entities
    this.entities = [];
  }

  preload() {
    // Load any assets required for the new Scene
    this.entities.push(new Background(this, 'background', Assets.Images.background));

    // Preload all the entities
    for (let e of this.entities) {
      e.preload();
    }
  }

  create() {
    // Place all the entities
    for (let e of this.entities) {
      e.create();
    }
  }
}