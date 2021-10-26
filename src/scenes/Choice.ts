import Phaser from 'phaser';

import {Assets} from '../assets';
import {Backgrounds} from '../entities/backgrounds/Backgrounds';
import {Characters} from '../entities/characters/Characters';
import {Entity} from '../entities/Entity';

/**
 * Choice scene
 */
export default class Choice extends Phaser.Scene {
  private entities: Entity[];

  /**
   * Default constructor
   */
  constructor() {
    super('GameScene');

    // Initialise empty collection of Entities
    this.entities = [];
  }

  /**
   * Preload
   */
  preload() {
    // Load any assets required for the new Scene
    this.entities.push(
        new Backgrounds.Outdoor(this, 'tBackground', Assets.Images.background),
        new Characters.Robot(this, 'tRobot', Assets.Images.robot)
    );

    // Preload all the entities
    for (const e of this.entities) {
      e.preload();
    }
  }

  /**
   * Create
   */
  create() {
    // Place all the entities
    for (const e of this.entities) {
      e.create();
    }
  }
}
