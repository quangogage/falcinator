"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UpdateRoaming;
var changeTimeRange = [750, 1250];
var changeTime = getRandom(changeTimeRange[0], changeTimeRange[1]);

function UpdateRoaming(i, v, dt) {
  v.timer += dt;
  if (v.timer >= changeTime) {
    v.target.x = getRandom(0, window.innerWidth);
    v.target.y = getRandom(0, window.innerHeight);
    v.timer = 0;
    changeTime = getRandom(changeTimeRange[0], changeTimeRange[1]);
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}