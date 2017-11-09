'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WeaponHandler;

var _Bullet = require('./Bullet/Bullet');

var _Game = require('./Game');

function WeaponHandler(mouseX, mouseY) {
  (0, _Bullet.shootBullet)(_Game.ship.offset().left + _Game.ship.width() / 2, _Game.ship.offset().top + _Game.ship.height() / 2, mouseX, mouseY);
}