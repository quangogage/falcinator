'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLost = undefined;
exports.LoadLose = LoadLose;
exports.UpdateLose = UpdateLose;

var _Timer = require('./Timer/Timer');

var _LoseExplosion = require('./Particle/LoseExplosion');

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasLost = exports.hasLost = false;

function LoadLose() {
  exports.hasLost = hasLost = false;
}

// Checking if you've lost
function UpdateLose(dt) {
  if (!hasLost && _Timer.timer <= 0) {
    TriggerLose();
  }
}

// Trigger losing stuff
function TriggerLose() {
  (0, _LoseExplosion.TriggerLoseExplosion)(_Game2.default.el.offset().left + _Game2.default.el.width() / 2, _Game2.default.el.offset().top + _Game2.default.el.height() / 2);
  _Game2.default.el.remove();
}