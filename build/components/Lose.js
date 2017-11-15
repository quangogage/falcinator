'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLost = undefined;
exports.LoadLose = LoadLose;
exports.UpdateLose = UpdateLose;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Timer = require('./Timer/Timer');

var _LoseExplosion = require('./Particle/LoseExplosion');

var _Game = require('./Game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasLost = exports.hasLost = false;

function LoadLose() {
  exports.hasLost = hasLost = false;
}

// Checking if you've lost
function UpdateLose(dt) {
  if (!hasLost && _Timer.timer <= 0) {
    TriggerLose();
    exports.hasLost = hasLost = true;
  }
}

// Trigger losing stuff
function TriggerLose() {
  (0, _LoseExplosion.TriggerLoseExplosion)(_Game.ship.offset().left + _Game.ship.width() / 2, _Game.ship.offset().top + _Game.ship.height() / 2);
  _Game.ship.remove();
  animateGame();
}

function animateGame() {
  alert('this is working wtf');
  (0, _jquery2.default)('.Game').animate({ background: 'black' }, { duration: 500 });
}