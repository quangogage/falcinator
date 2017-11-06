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
  console.log(_HandlePowerups.powerupList[1].timer);
  if (isActive === true) {
    var newDt = (now - lastUpdate) / 2;
    return newDt;
  } else {
    return now - lastUpdate;
  }
}