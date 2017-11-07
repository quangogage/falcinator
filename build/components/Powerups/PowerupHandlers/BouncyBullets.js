'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BouncyBullets = BouncyBullets;

var _Bullet = require('../../Bullet');

function BouncyBullets(dt) {
  for (var i = 0; i < _Bullet.bullets.length; i++) {
    var v = _Bullet.bullets[i];
    if (v.x < 10) {
      v.angle += Math.PI;
      v.x = 10;
    } else if (v.x > window.innerWidth - 20) {
      v.angle += Math.PI;
      v.x = window.innerWidth - 20;
    }
    if (v.y < 10) {
      v.angle += Math.PI;
      v.y = 10;
    } else if (v.y > window.innerHeight - 20) {
      v.angle += Math.PI;
      v.y = window.innerHeight - 20;
    }
  }
}