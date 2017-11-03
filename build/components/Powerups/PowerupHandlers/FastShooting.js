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

function FastShooting(dt) {
  console.log('uhh trying to shoot a bullet');
  (0, _Bullet.shootBullet)(_Game.mouseX, _Game.mouseY, _Game.ship, (0, _jquery2.default)('.Game'));
}