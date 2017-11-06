"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowMotion = SlowMotion;
exports.handleSlowMo = handleSlowMo;
var isActive = false;
function SlowMotion(dt, currentPowerup) {
  if (currentPowerup === 1) {
    isActive = true;
  } else {
    isActive = false;
  }
}

function handleSlowMo(dt) {
  if (isActive === true) {
    return dt / 2;
  } else {
    return dt;
  }
}