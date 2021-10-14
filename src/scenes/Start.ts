import Phaser from 'phaser';

export default class Start extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {}

  create() {
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const text = this.add.text(centerX, centerY, 'This is some centered text!');
    Phaser.Display.Align.In.Center(text, this.add.zone(400, 300, 800, 600));

    this.tweens.add({
      targets: text,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}