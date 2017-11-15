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
  var game = $('.Game');
  game.animate({
    background: 'RGB(200,200,200)'
  }, {
    duration: 420,
    queue: false,
    complete: function complete() {
      game.animate({
        background: ''
      }, { duration: 420, queue: false });
    }
  });
}