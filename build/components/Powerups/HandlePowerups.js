'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlePowerups = HandlePowerups;
exports.activatePowerup = activatePowerup;

var _FastShooting = require('./PowerupHandlers/FastShooting');

var powerupList = [{
  name: 'fast shooting',
  func: _FastShooting.FastShooting,
  duration: 3000
}];
var currentPowerup = null;

var timer = 0;
function HandlePowerups(dt) {
  if (currentPowerup !== null) {
    // Run the powerup function
    powerupList[currentPowerup].func(dt);

    // Run the timer/end when complete
    timer += dt;
    if (timer >= powerupList[currentPowerup].duration) {
      currentPowerup = null;
    }
  }
}

// Activate / return new powerup
function activatePowerup() {
  timer = 0;
  currentPowerup = 0;
}