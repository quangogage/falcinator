'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowMotion = SlowMotion;
exports.handleSlowMo = handleSlowMo;

var _HandlePowerups = require('../HandlePowerups');

function SlowMotion(dt) {}

function handleSlowMo(dt) {
  var isActive = _HandlePowerups.powerupList[1].active;
  console.log(dt);
  if (isActive === true) {
    return dt / 2;
  } else {
    return dt;
  }
}