'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BurstShot = BurstShot;
exports.HandleBurstShot = HandleBurstShot;

var _HandlePowerups = require('../HandlePowerups');

var _Bullet = require('../../Bullet');

function BurstShot(dt) {}

function HandleBurstShot(e, ship, world) {
  var isActive = _HandlePowerups.powerupList[3].active;
  if (isActive) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI * 1.5;
    var newX = shipX + Math.cos(angle) * 50;
    var newY = shipY + Math.sin(angle) * 50;

    (0, _Bullet.shootBullet)(newX, newY, ship, world);

    angle = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI * 0.8;
    newX = shipX + Math.cos(angle) * 50;
    newY = shipY + Math.sin(angle) * 50;

    (0, _Bullet.shootBullet)(newX, newY, ship, world);
  }
}