import Phaser from 'phaser';

export default class Choice extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('background', 'assets/backgrounds/temp_background.png');
  }

  create() {
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;

    background.setScrollFactor(0);
    background.setScale(scaleX, scaleY);
  }
}