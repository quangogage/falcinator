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
  setTimeout(function () {
    createPrompt();
  }, 1500);
}

function animateGame() {
  (0, _jquery2.default)('.Game').css({ transition: 'background 1.25s' });
  (0, _jquery2.default)('.Game').css({ backgroundColor: 'RGB(50,50,50)' });
  setTimeout(function () {
    (0, _jquery2.default)('.Game').css({ transition: 'background 4s' });
    (0, _jquery2.default)('.Game').css({ backgroundColor: '' });
  }, 1250);
}

// Create the prompt
var headerStyles = '\n  font-family:actionman;\n  font-size:50px;\n  color:white;\n  padding:50px;  \n';
var paragraphStyles = '\n  font-family:actionman;\n  font-size:35px;\n  color:white;\n  padding:25px;\n';
function createPrompt() {
  var prompt = (0, _jquery2.default)('<div class="lose-prompt">\n    <div class=\'window\'>\n      <h1 style="' + headerStyles + '">You lose</h1>\n      <p style="' + paragraphStyles + '">Try again?</p>\n    </div>\n  </div>');
  (0, _jquery2.default)('.Game').append(prompt);
}