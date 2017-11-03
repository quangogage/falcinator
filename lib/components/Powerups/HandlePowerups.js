import { FastShooting } from './PowerupHandlers/FastShooting';
var powerupList = [
  {
    name: 'fast shooting',
    func: FastShooting,
    duration: 200
  }
];
var currentPowerup = null;

var timer = 0;
export function HandlePowerups(dt) {
  if (currentPowerup !== null) {
    // Run the powerup function
    powerupList[currentPowerup].func(dt);

    // Run the timer/end when complete
    timer += dt;
    console.log(timer);
    if (timer >= powerupList.duration) {
      currentPowerup = null;
    }
  }
}

// Activate / return new powerup
export function activatePowerup() {
  timer = 0;
  currentPowerup = 0;
}
