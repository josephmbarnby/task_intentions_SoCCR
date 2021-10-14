import Phaser from 'phaser';
import config from './config';
import Choice from './scenes/Choice';
import Start from './scenes/Start';

new Phaser.Game(
  Object.assign(config, {
    scene: [Start]
  })
);