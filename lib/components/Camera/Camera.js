import $ from 'jquery';
var cam = {
  x: 0,
  y: 0,
  resetSpeed: 0.025
};
export function UpdateCamera(dt) {
  cam.x = cam.x - (cam.x - 0) * cam.resetSpeed * dt;
  cam.y = cam.y - (cam.y - 0) * cam.resetSpeed * dt;

  if (Math.abs(cam.x - 0) <= 1) {
    cam.x = 0;
    $('.Game').css({ left: 0 });
  }
  if (Math.abs(cam.y - 0) <= 1) {
    cam.y = 0;
    $('.Game').css({ top: 0 });
  }

  // Don't get TOO crazy!
  if (cam.x > 40) {
    cam.x = 40;
  } else if (cam.x < -40) {
    cam.x = -40;
  }
  if (cam.y > 40) {
    cam.y = 40;
  } else if (cam.y < -40) {
    cam.y = -40;
  }

  if (cam.x !== 0 || cam.y !== 0) {
    $('.Game').css({
      left: cam.x,
      top: cam.y
    });
  }
}
export function ShakeCamera(shake) {
  var angle = getRandom(-5 * 100, 5 * 100) / 100;
  var amount = Math.floor(getRandom(shake * 80, shake * 120) / 100);
  cam.x = Math.cos(angle) * amount;
  cam.y = Math.sin(angle) * amount;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
