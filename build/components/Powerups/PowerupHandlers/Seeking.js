'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailSeek = MailSeek;

var _Bullet = require('../../Bullet');

function MailSeek(dt) {
  for (var i = 0; i < _Bullet.bullets.length; i++) {
    _Bullet.bullets[i].angle += 0.05 * dt;
  }
}