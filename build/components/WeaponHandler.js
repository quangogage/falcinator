'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WeaponHandler;

var _Bullet = require('./Bullet/Bullet');

var _Game = require('./Game');

var _Lose = require('./Lose');

function WeaponHandler(mouseX, mouseY) {
  if (!_Lose.hasLost) {
    (0, _Bullet.shootBullet)(_Game.ship.offset().left + _Game.ship.width() / 2, _Game.ship.offset().top + _Game.ship.height() / 2, mouseX, mouseY);
  }
}