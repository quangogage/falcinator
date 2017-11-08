import $ from 'jquery';
import { bullets } from '../Bullet';
import { ShakeCamera } from '../../Camera/Camera';
import { shootBullet } from '../Bullet';
const img = require('../cannonball.png');

var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%',
  imageRendering: 'pixelated',
  userSelect: 'none'
};

// Adjustable Variables
var speed = 0.5;

var CannonBall = {
  name: 'cannonball',

  // Creating an Cannonball bullet
  create: function(originX, originY, targetX, targetY, obj) {
    var el, angle;

    // Create element/Basic styles
    el = $(`<img src=${img} class="bullet"/>`);
    el.css(styles);

    // Calculate Direction
    angle = Math.atan2(targetY - originY, targetX - originX);

    // Init the object
    obj.type = 'cannonball';
    obj.el = el;
    obj.x = originX;
    obj.y = originY;
    obj.angle = angle;
    obj.onDestroy = onDestroy;

    // Set initial position/rotation of element
    var cssAngle = angle + Math.PI / 2;
    el.css({
      left: originX,
      top: originY,
      transform: 'rotate(' + cssAngle + 'rad)'
    });

    // Place element on DOM
    $('.Game').append(el);
  },
  update: function(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply to element
    var newAngle = v.angle + Math.PI / 2;
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + newAngle + 'rad)'
    });
  }
};

// Destroying
function onDestroy(x, y) {
  ShakeCamera(18);
  var amount = getRandom(7, 12);
  for (var ic = 0; ic < amount; ic++) {
    var tarx = getRandom(-window.innerWidth, window.innerWidth * 2);
    var tary = getRandom(-window.innerHeight, window.innerHeight * 2);
    shootBullet(x, y, tarx, tary, 'envelop');
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export default CannonBall;
