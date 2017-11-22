'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowMotion = SlowMotion;
exports.handleSlowMo = handleSlowMo;

var _HandlePowerups = require('../HandlePowerups');

function SlowMotion(dt) {}

function handleSlowMo(dt, now, lastUpdate) {
  var isActive = _HandlePowerups.powerupList[1].active;
  if (isActive === true) {
    return (now - lastUpdate) / 2;
  } else {
    return now - lastUpdate;
  }
}