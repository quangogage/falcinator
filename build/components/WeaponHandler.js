'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WeaponHandler;

var _Bullet = require('./Bullet/Bullet');

var _Beam = require('./Beam');

var _Game = require('./Game');

function WeaponHandler(mouseX, mouseY) {
  /*
  shootBullet(
    ship.offset().left + ship.width() / 2,
    ship.offset().top + ship.height() / 2,
    mouseX,
    mouseY
  );
  */
  (0, _Beam.shootBeam)(mouseX);
}