"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneratePowerups;
var timer = 0;
var spawnRate = 100; // How often should it roll for a powerup?
var spawnChanceRange = 2.45; // How likely is it that a powerup spawns ( percentage ) ?
var waitTimer = 0;
var waitTime = 20000; // How long into playing until powerups start spawning?
/*spawnChanceRange = 100;
spawnRate = 1250;*/

function GeneratePowerups(spawnPowerup, dt) {
  waitTimer += dt;
  if (waitTimer >= waitTime) {
    timer += dt;
    if (timer >= spawnRate) {
      var roll = getRandom(0, 100);
      if (roll <= spawnChanceRange) {
        spawnPowerup();
      }
      timer = 0;
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}