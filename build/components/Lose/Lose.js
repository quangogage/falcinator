'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLost = undefined;
exports.LoadLose = LoadLose;
exports.UpdateLose = UpdateLose;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Timer = require('../Timer/Timer');

var _LoseExplosion = require('../Particle/LoseExplosion');

var _Highscores = require('./Highscores');

var _Game = require('../Game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasLost = exports.hasLost = false;

function LoadLose() {
  exports.hasLost = hasLost = false;
}

// Checking if you've lost
function UpdateLose(dt) {
  if (!hasLost && _Timer.timer <= 0) {
    TriggerLose();
    (0, _jquery2.default)('#your-score').html('Your score: ' + formatTime(_Timer.totalTimer));
    exports.hasLost = hasLost = true;
  }
}

// Trigger losing stuff
function TriggerLose() {
  (0, _LoseExplosion.TriggerLoseExplosion)(_Game.ship.offset().left + _Game.ship.width() / 2, _Game.ship.offset().top + _Game.ship.height() / 2);
  _Game.ship.remove();
  animateGame();
  (0, _Highscores.HandleHighscore)();
  setTimeout(function () {
    (0, _jquery2.default)('.LosePrompt').css({ display: 'block' });
  }, 2000);
}

function animateGame() {
  (0, _jquery2.default)('.Game').css({ transition: 'background 1.25s' });
  (0, _jquery2.default)('.Game').css({ backgroundColor: 'RGB(50,50,50)' });
  setTimeout(function () {
    (0, _jquery2.default)('.Game').css({ transition: 'background 4s' });
    (0, _jquery2.default)('.Game').css({ backgroundColor: '' });
  }, 1250);
}

function formatTime(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}