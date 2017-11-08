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
      var angle1 = v.angle + Math.PI * 0.1;
      var x1 = v.x + Math.cos(angle1) * 10;
      var y1 = v.y + Math.sin(angle1) * 10;
      (0, _Bullet.shootBullet)(v.x, v.y, x1, y1, null, { burst: true });

      var angle2 = v.angle - Math.PI * 0.1;
      var x2 = v.x + Math.cos(angle2) * 10;
      var y2 = v.y + Math.sin(angle2) * 10;
      (0, _Bullet.shootBullet)(v.x, v.y, x2, y2, null, { burst: true });

      v.burstShot = true;
    }
  }
}