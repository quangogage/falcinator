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

var _Notification = require('./Notification/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var powerupList = exports.powerupList = [{
  name: 'Fast Shooting',
  func: _FastShooting.FastShooting,
  duration: 3000,
  active: false,
  timer: 0
}, {
  name: 'Slow Motion',
  func: _SlowMotion.SlowMotion,
  duration: 3500,
  active: false,
  timer: 0
}, {
  name: 'Seeking Mail!',
  func: _Seeking.MailSeek,
  duration: 3500,
  active: false,
  timer: 0
}];

function HandlePowerups(dt) {
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
function activatePowerup() {
  var activePowerup = powerupList[Math.floor(getRandom(0, powerupList.length - 1))];
  activePowerup = powerupList[2];
  activePowerup.timer = 0;
  activePowerup.active = true;
  (0, _Notification2.default)(activePowerup.name);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}