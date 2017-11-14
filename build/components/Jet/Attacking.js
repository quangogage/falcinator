'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UpdateAttacking;

var _Quail = require('../Quail/Quail');

var _Bullet = require('../Bullet/Bullet');

var burstTime = 250;
var shootTime = 65;

function UpdateAttacking(v, dt) {
  var targetQuail = _Quail.quails[_Quail.quails.length - 1];

  // Targeting
  v.target.x = targetQuail.x + targetQuail.el.width() / 2;
  v.target.y = targetQuail.y + targetQuail.el.height() / 2;

  //Shooting
  v.burstTimer += dt;
  if (v.burstTimer >= burstTime) {
    v.shootTimer += dt;
    if (v.shootTimer >= shootTime) {
      if (v.shotCount < 2) {
        (0, _Bullet.shootBullet)(v.x, v.y, v.x + Math.cos(v.angle) * 10, v.y + Math.sin(v.angle) * 10);
        v.shotCount += 1;
      } else {
        v.burstTimer = 0;
      }
      v.shootTimer = 0;
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}