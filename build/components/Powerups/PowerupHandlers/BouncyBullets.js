'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BouncyBullets = BouncyBullets;

var _Bullet = require('../../Bullet/Bullet');

function BouncyBullets(dt) {
  for (var i = 0; i < _Bullet.bullets.length; i++) {
    var v = _Bullet.bullets[i];
    if (v.x < 20) {
      v.angle = (v.angle - Math.PI) * -1;
      v.x = 20;
    } else if (v.x > window.innerWidth - 20) {
      v.angle = (v.angle - Math.PI) * -1;
      v.x = window.innerWidth - 20;
    }
    if (v.y < 20) {
      v.angle = (v.angle - Math.PI) * -1 - Math.PI;
      v.y = 20;
    } else if (v.y > window.innerHeight - 20) {
      v.angle = (v.angle - Math.PI) * -1 - Math.PI;
      v.y = window.innerHeight - 20;
    }
  }
}