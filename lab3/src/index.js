import Phaser from 'phaser'

import StartingScene from '../scenes/starting-scene';

const config = {
  type: Phaser.AUTO, //webgl, webgpu
  width: 800,
  height: 600,
  pixelArt: true,
  zoom: 1.2,
  scene: StartingScene,
  physics: {
    default: "arcade",
    debug: true,
    arcade: {
      gravity: { y: 0,
        debug: true // set to true to view zones
        }
    }
  },
};

const game = new Phaser.Game(config);
