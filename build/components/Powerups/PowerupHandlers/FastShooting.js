'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FastShooting = FastShooting;

var _Bullet = require('../../Bullet');

var _Game = require('../../Game');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = 0;
var shootRate = 15;
function FastShooting(dt) {
  timer += dt;
  if (timer >= shootRate) {
    (0, _Bullet.shootBullet)(_Game.mouseX, _Game.mouseY, _Game.ship, (0, _jquery2.default)('.Game'));
    timer = 0;
  }
}