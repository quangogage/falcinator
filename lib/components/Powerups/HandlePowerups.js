import { FastShooting } from './PowerupHandlers/FastShooting';
import { SlowMotion } from './PowerupHandlers/SlowMotion';
import { MailSeek } from './PowerupHandlers/Seeking';
import { BurstShot } from './PowerupHandlers/BurstShot';
import { BouncyBullets } from './PowerupHandlers/BouncyBullets';
import { MailCannon } from './PowerupHandlers/MailCannon';
import CreateNotification from './Notification/Notification';
export var powerupList = [
  {
    name: 'Fast Shooting',
    phrase: 'MAIL dominance!',
    func: FastShooting,
    duration: 6500,
    active: false,
    timer: 0
  },
  {
    name: 'Slow Motion',
    phrase: 'SNAIL MAIL!',
    func: SlowMotion,
    duration: 3750,
    active: false,
    timer: 0
  },
  {
    name: 'Seeking Mail!',
    phrase: 'MAIL, man!',
    func: MailSeek,
    duration: 7250,
    active: false,
    timer: 0
  },
  {
    name: 'Burst Shot!',
    phrase: 'Going POSTAL!',
    func: BurstShot,
    duration: 7500,
    active: false,
    timer: 0
  },
  {
    name: 'Ricochet Bullets!',
    phrase: 'MAILSTROM!',
    func: BouncyBullets,
    duration: 7500,
    active: false,
    timer: 0
  },
  {
    name: '...Mail Cannon!',
    phrase: 'Mail Cannon!',
    func: MailCannon,
    duration: 10000,
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
  // activePowerup = powerupList[5];
  activePowerup.timer = 0;
  activePowerup.active = true;
  CreateNotification(activePowerup.phrase, activePowerup.name);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
