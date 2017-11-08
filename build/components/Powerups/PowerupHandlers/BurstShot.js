'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BurstShot = BurstShot;

var _Bullet = require('../../Bullet/Bullet');

var _Game = require('../../Game');

function BurstShot(dt) {
  for (var i = 0; i < _Bullet.bullets.length; i++) {
    var v = _Bullet.bullets[i];
    if (!v.burstShot && !v.flags.burst) {
      var angle1 = v.angle;
      var x1 = v.x + Math.cos(v.angle) * 10;
      var y1 = v.y + Math.sin(v.angle) * 10;
      (0, _Bullet.shootBullet)(v.x, v.y, x1, y1, null, { burst: true });

      v.burstShot = true;
    }
  }
}