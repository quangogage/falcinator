'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.powerupList = undefined;
exports.HandlePowerups = HandlePowerups;
exports.activatePowerup = activatePowerup;

var _FastShooting = require('./PowerupHandlers/FastShooting');

var _SlowMotion = require('./PowerupHandlers/SlowMotion');

var _Seeking = require('./PowerupHandlers/Seeking');

var _BurstShot = require('./PowerupHandlers/BurstShot');

var _BouncyBullets = require('./PowerupHandlers/BouncyBullets');

var _MailCannon = require('./PowerupHandlers/MailCannon');

var _Notification = require('./Notification/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var powerupList = exports.powerupList = [{
  name: 'Fast Shooting',
  phrase: 'MAIL dominance!',
  func: _FastShooting.FastShooting,
  duration: 6500,
  active: false,
  timer: 0
}, {
  name: 'Slow Motion',
  phrase: 'SNAIL MAIL!',
  func: _SlowMotion.SlowMotion,
  duration: 3750,
  active: false,
  timer: 0
}, {
  name: 'Seeking Mail!',
  phrase: 'MAIL, man!',
  func: _Seeking.MailSeek,
  duration: 7250,
  active: false,
  timer: 0
}, {
  name: 'Burst Shot!',
  phrase: 'Going POSTAL!',
  func: _BurstShot.BurstShot,
  duration: 7500,
  active: false,
  timer: 0
}, {
  name: 'Ricochet Bullets!',
  phrase: 'MAILSTROM!',
  func: _BouncyBullets.BouncyBullets,
  duration: 7500,
  active: false,
  timer: 0
}, {
  name: '...Cannon Balls',
  phrase: 'Mail Cannon!',
  func: _MailCannon.MailCannon,
  duration: 10000,
  active: false,
  timer: 0
}];

function HandlePowerups(dt) {
  for (var i = 0; i < powerupList.length; i++) {
    var v = powerupList[i];
    if (v.active === true) {
      // Execute the powerup handler function
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
function activatePowerup() {
  var activePowerup = powerupList[Math.floor(getRandom(0, powerupList.length - 1))];
  activePowerup = powerupList[3];
  activePowerup.timer = 0;
  activePowerup.active = true;
  (0, _Notification2.default)(activePowerup.phrase, activePowerup.name);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}