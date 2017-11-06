'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCamera = UpdateCamera;
exports.ShakeCamera = ShakeCamera;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cam = {
  x: 0,
  y: 0,
  resetSpeed: 0.1
};
function UpdateCamera(dt) {
  cam.x = cam.x - (cam.x - 0) * cam.resetSpeed * dt;
  cam.y = cam.y - (cam.y - 0) * cam.resetSpeed * dt;

  if (cam.x !== 0 || cam.y !== 0) {
    (0, _jquery2.default)('.Game').css({
      left: cam.x,
      top: cam.y
    });
  }
}
function ShakeCamera(amount) {
  var angle = getRandom(-5 * 100, 5 * 100) / 100;
  cam.x += Math.cos(angle) * amount;
  cam.y += Math.sin(angle) * amount;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}