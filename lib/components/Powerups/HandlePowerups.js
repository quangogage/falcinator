import { FastShooting } from './PowerupHandlers/FastShooting';
import { SlowMotion } from './PowerupHandlers/SlowMotion';
export var powerupList = [
  {
    name: 'fast shooting',
    func: FastShooting,
    duration: 3000,
    active: false,
    timer: 0
  },
  {
    name: 'slow motion',
    func: SlowMotion,
    duration: 150,
    active: false,
    timer: 0
  }
];

export function HandlePowerups(dt) {
  for (var i = 0; i < powerupList.length; i++) {
    var v = powerupList[i];
    if (v.active === true) {
      v.func(dt);

      // Lifetime
      v.timer += dt;
      if (i === 1) {
        console.log(v.timer);
      }
      if (v.timer >= v.duration) {
        v.active = false;
      }
    }
  }
}

// Activate / return new powerup
export function activatePowerup() {
  var activePowerup =
    powerupList[Math.floor(getRandom(0, powerupList.length - 1))];
  console.log('powerup activated!');
  activePowerup.timer = 0;
  activePowerup.active = true;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
