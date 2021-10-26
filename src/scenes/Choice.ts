import Phaser from 'phaser';

import { Assets } from '../assets';
import { Backgrounds } from '../entities/backgrounds/Backgrounds';
import { Characters } from '../entities/characters/Characters';
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
    this.entities.push(new Backgrounds.Outdoor(this, 'tBackground', Assets.Images.background));
    this.entities.push(new Characters.Robot(this, 'tRobot', Assets.Images.robot));

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