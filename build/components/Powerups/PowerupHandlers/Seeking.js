'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailSeek = MailSeek;

var _Bullet = require('../../Bullet');

var _Quail = require('../../Quail/Quail');

var turnSpeed = 0.7;
function MailSeek(dt) {
  for (var i = 0; i < _Bullet.bullets.length; i++) {
    var v = _Bullet.bullets[i];
    var target = getQuail(v.x, v.y);
    if (!target) {
      v.angle = v.angle;
    } else {
      var targetAngleRad = Math.atan2(v.y - target.y, v.x - target.x) - Math.PI / 2;
      var targetAngle = toDegrees(targetAngleRad);
      var bulletAngle = toDegrees(v.angle);

      if (bulletAngle - targetAngle == 0) {
        return;
      }
      if (Math.abs(bulletAngle - targetAngle) < 180) {
        // Rotate current directly towards target.
        if (bulletAngle < targetAngle) {
          bulletAngle += turnSpeed * dt;
        } else {
          bulletAngle -= turnSpeed * dt;
        }
      } else {
        // Rotate the other direction towards target.
        if (bulletAngle < targetAngle) {
          bulletAngle -= turnSpeed * dt;
        } else {
          bulletAngle += turnSpeed * dt;
        }
      }
      bulletAngle = (bulletAngle % 360 + 360) % 360;
      v.angle = toRadians(bulletAngle);
    }
  }
}

// Get the closest quail
function getQuail(x, y) {
  var closest;

  // Return null if there are no living quails
  if (_Quail.quails.length === 0) {
    console.log('no quails');
    return null;
  }

  // Iterate over each quail.
  for (var i = 0; i < _Quail.quails.length; i++) {
    var v = _Quail.quails[i];

    // init closest
    if (!closest) {
      closest = { x: v.x, y: v.y };
    } else {
      var originalDistance = getDistance(closest.x, closest.y, x, y);
      var comparingDistance = getDistance(v.x, v.y, x, y);

      // If this quail is closer than the previously closest
      // quail, make it the new closest
      if (comparingDistance <= originalDistance) {
        closest = { x: v.x, y: v.y };
      }
    }
  }
  return closest;
}

// Get the distance between two points
function getDistance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}

// Convert to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}