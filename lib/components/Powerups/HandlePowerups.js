import { FastShooting } from './PowerupHandlers/FastShooting';
import { SlowMotion } from './PowerupHandlers/SlowMotion';
var powerupList = [
  {
    name: 'fast shooting',
    func: FastShooting,
    duration: 3000
  },
  {
    name: 'slow motion',
    func: SlowMotion,
    duration: 1500
  }
];
var currentPowerup = null;

var timer = 0;
export function HandlePowerups(dt) {
  if (currentPowerup !== null) {
    // Run the powerup function
    powerupList[currentPowerup].func(dt, currentPowerup);

    // Run the timer/end when complete
    timer += dt;
    if (timer >= powerupList[currentPowerup].duration) {
      currentPowerup = null;
    }
  }
}

// Activate / return new powerup
export function activatePowerup() {
  timer = 0;
  currentPowerup = 1;
}
