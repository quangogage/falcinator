'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UpdateAttacking;

var _Quail = require('../Quail/Quail');

var _Bullet = require('../Bullet/Bullet');

var _Flash = require('../Flash');

var _HandlePowerups = require('../Powerups/HandlePowerups');

var burstTime = 500;
var shootTime = 100;
var fastShootRate = 50;

function UpdateAttacking(v, dt) {
  var targetQuail = _Quail.quails[_Quail.quails.length - 1];

  // Targeting
  if (targetQuail.dir === 1) {
    v.target.x = targetQuail.x + targetQuail.el.width() * 0.75;
  } else {
    v.target.x = targetQuail.x - targetQuail.el.width() * 0.25;
  }
  v.target.y = targetQuail.y + targetQuail.el.height() / 2;

  //Shooting
  if (_HandlePowerups.powerupList[0].active) {
    v.shootTimer += dt;
    if (v.shootTimer >= fastShootRate) {
      (0, _Bullet.shootBullet)(v.x + Math.cos(v.angle) * v.el.width() * 0.6, v.y + Math.sin(v.angle) * v.el.width() * 0.6, v.x + Math.cos(v.angle) * v.el.width(), v.y + Math.sin(v.angle) * v.el.width());
      (0, _Flash.CreateFlash)(v.x + Math.cos(v.angle) * v.el.width(), v.y + Math.sin(v.angle) * v.el.width());
      v.shootTimer = 0;
    }
  } else {
    v.burstTimer += dt;
    if (v.burstTimer >= burstTime) {
      v.shootTimer += dt;
      if (v.shootTimer >= shootTime) {
        if (v.shotCount < 3) {
          (0, _Bullet.shootBullet)(v.x + Math.cos(v.angle) * v.el.width() * 0.6, v.y + Math.sin(v.angle) * v.el.width() * 0.6, v.x + Math.cos(v.angle) * v.el.width(), v.y + Math.sin(v.angle) * v.el.width());
          (0, _Flash.CreateFlash)(v.x + Math.cos(v.angle) * v.el.width(), v.y + Math.sin(v.angle) * v.el.width());
          v.shotCount += 1;
        } else {
          v.shotCount = 0;
          v.burstTimer = 0;
        }
        v.shootTimer = 0;
      }
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}