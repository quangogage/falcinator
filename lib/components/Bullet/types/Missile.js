import $ from 'jquery';
import { mouseX, mouseY } from '../../Game';
import { createParticle } from '../../Particle/Particle';
import Smoke from '../../Particle/Smoke';
const img = require('../missile.png');

// Default styles
var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%',
  imageRendering: 'pixelated',
  userSelect: 'none'
};

// Adjustable Variables
var speed = 1.1;
var turnSpeedRange = [0.2, 0.35];
var smokeSpawnRate = 50;
var lifetime = 15000;
var fallSpeed = 0.5;

var Missile = {
  name: 'missile',

  // Creating an missile bullet
  create: function(originX, originY, targetX, targetY, obj) {
    var el, angle;

    // Create element/Basic styles
    el = $(`<img src=${img} class="bullet"/>`);
    el.css(styles);

    // Calculate Direction
    angle = Math.atan2(targetY - originY, targetX - originX);

    // Init the object
    obj.type = 'missile';
    obj.el = el;
    obj.x = originX;
    obj.y = originY;
    obj.angle = angle;
    obj.smokeTimer = 0;
    obj.turnSpeed =
      getRandom(turnSpeedRange[0] * 100, turnSpeedRange[1] * 100) / 100;
    obj.timer = 0;

    // Set initial position/rotation of element
    var cssAngle = angle + Math.PI / 2;
    el.css({
      left: originX,
      top: originY,
      transform: 'rotate(' + cssAngle + 'rad) scaleX(0.666)'
    });

    // Place element on DOM
    $('.Game').append(el);
  },
  update: function(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Aiming at the mouse
    v.angle = aim(v.angle, v.x, v.y, v.turnSpeed, dt);

    live(v, dt);

    // Apply to element
    var cssAngle = v.angle + Math.PI / 2;
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + cssAngle + 'rad)'
    });
  }
};

function live(v, dt) {
  v.timer += dt;
  if (v.timer >= lifetime) {
    createParticle(v.x, v.y, v.angle);
    v.setToDelete = true;
  }
}

// Turning towards the mouse
function aim(angle, x, y, turnSpeed, dt) {
  var target = { x: mouseX, y: mouseY };
  var targetAngleRad = Math.atan2(y - target.y, x - target.x) + Math.PI; // Where the bullet wants to aim
  var targetAngle = toDegrees(targetAngleRad); // Convert them both to degrees ( from radians )
  var bulletAngle = toDegrees(angle);
  if (Math.abs(bulletAngle - targetAngle) <= 5) {
    // If the angle is basically where it wants to be then do nothing
    return angle;
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
  return toRadians(bulletAngle);
}
// ** Helper Functions ** \\

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
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

export default Missile;
