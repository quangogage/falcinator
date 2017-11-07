'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BurstShot = BurstShot;
exports.HandleBurstShot = HandleBurstShot;

var _HandlePowerups = require('../HandlePowerups');

function BurstShot(dt) {}

function HandleBurstShot(angle, shipX, shipY, shootFunc) {
  var isActive = _HandlePowerups.powerupList[3].active;
  if (isActive) {
    var newAngle = angle + Math.PI * 0.1;
    shootFunc(newAngle, shipX, shipY);
    var newAngle2 = angle + Math.PI * -0.1;
    shootFunc(newAngle2, shipX, shipY);
  }
}