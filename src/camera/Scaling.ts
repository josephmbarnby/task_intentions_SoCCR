import { Scene } from "phaser";

/**
 * Return the coordinates of the center point in the Phaser scene
 * @param {Scene} scene Phaser scene
 * @return {number[]}
 */
export function center(scene: Scene): number[] {
  return [scene.cameras.main.width / 2, scene.cameras.main.height / 2];
}

/**
 * Return the scaling parameters of an object in the Phaser scene
 * @param scene Phaser scene
 * @param width Width of the object to be scaled
 * @param height Height of the object to be scaled
 * @return {number[]}
 */
export function scale(scene: Scene, width: number, height: number): number[] {
  const scaleX = scene.cameras.main.width / width;
  const scaleY = scene.cameras.main.height / height;

  return [scaleX, scaleY];
}