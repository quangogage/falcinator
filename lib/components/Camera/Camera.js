import $ from 'jquery';
var cam = {
  x: 0,
  y: 0,
  resetSpeed: 0.05
};
export function UpdateCamera(dt) {
  cam.x = cam.x - (cam.x - 0) * cam.resetSpeed * dt;
  cam.y = cam.y - (cam.y - 0) * cam.resetSpeed * dt;

  if (cam.x !== 0 || cam.y !== 0) {
    $('.Game').css({
      left: cam.x,
      top: cam.y
    });
  }
}
export function ShakeCamera(amount) {
  var angle = getRandom(-5 * 100, 5 * 100) / 100;
  cam.x += Math.cos(angle) * amount;
  cam.y += Math.sin(angle) * amount;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
