'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Game = require('../../Game');

var _Smoke = require('../../Particle/Smoke');

var _Smoke2 = _interopRequireDefault(_Smoke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = require('../missile.png');

// Default styles
var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%',
  imageRendering: 'pixelated',
  userSelect: 'none'
};

// Adjustable Variables
var speed = 1.1;
var turnSpeedRange = [0.3, 0.6];
var smokeSpawnRate = 50;

var Missile = {
  name: 'missile',

  // Creating an missile bullet
  create: function create(originX, originY, targetX, targetY, obj) {
    var el, angle;

    // Create element/Basic styles
    el = (0, _jquery2.default)('<img src=' + img + ' class="bullet"/>');
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
    obj.turnSpeed = getRandom(turnSpeedRange[0], turnSpeedRange[1]);

    // Set initial position/rotation of element
    var cssAngle = angle + Math.PI / 2;
    el.css({
      left: originX,
      top: originY,
      transform: 'rotate(' + cssAngle + 'rad) scaleX(0.666)'
    });

    // Place element on DOM
    (0, _jquery2.default)('.Game').append(el);
  },
  update: function update(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Aiming at the mouse
    v.angle = aim(v.angle, v.x, v.y, v.turnSpeed, dt);

    // Generating the smoke trail
    // generateSmoke(v, dt);

    // Apply to element
    var cssAngle = v.angle + Math.PI / 2;
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + cssAngle + 'rad)'
    });
  }
};

// Turning towards the mouse
function aim(angle, x, y, turnSpeed, dt) {
  var target = { x: _Game.mouseX, y: _Game.mouseY };
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

// Creating the smoke trail
function generateSmoke(v, dt) {
  v.smokeTimer += dt;
  if (v.smokeTimer >= smokeSpawnRate) {
    for (var i = 0; i < 5; i++) {
      var x = v.x + v.el.width() / 2 + Math.cos(v.angle + Math.PI) * v.el.width();
      var y = v.y + v.el.height() / 2 + Math.sin(v.angle + Math.PI) * v.el.width();
      var bottomPos = getRandom(0, v.el.width() / 2);
      x += Math.cos(v.angle + Math.PI / 2) * bottomPos;
      y += Math.sin(v.angle + Math.PI / 2) * bottomPos;
      _Smoke2.default.play(x, y);
      v.smokeTimer = 0;
    }
  }
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

exports.default = Missile;