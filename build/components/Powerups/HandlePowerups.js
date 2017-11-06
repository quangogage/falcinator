'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.powerupList = undefined;
exports.HandlePowerups = HandlePowerups;
exports.activatePowerup = activatePowerup;

var _FastShooting = require('./PowerupHandlers/FastShooting');

var _SlowMotion = require('./PowerupHandlers/SlowMotion');

var powerupList = exports.powerupList = [{
  name: 'fast shooting',
  func: _FastShooting.FastShooting,
  duration: 3000,
  active: false,
  timer: 0
}, {
  name: 'slow motion',
  func: _SlowMotion.SlowMotion,
  duration: 150,
  active: false,
  timer: 0
}];

function HandlePowerups(dt) {
  for (var i = 0; i < powerupList.length - 1; i++) {
    var v = powerupList[i];
    if (v.active === true) {
      v.func(dt);

      // Lifetime
      if (v.timer >= v.duration) {
        v.active = false;
      }
    }
    v.timer += dt;
    if (i === 1) {
      console.log(v.timer);
    }
  }
}

// Activate / return new powerup
function activatePowerup() {
  var activePowerup = powerupList[Math.floor(getRandom(0, powerupList.length - 1))];
  console.log('powerup activated!');
  activePowerup.timer = 0;
  activePowerup.active = true;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}