import $ from 'jquery';
import { quails } from '../Quail/Quail';
import UpdateRoaming from './Roaming';
import UpdateAttacking from './Attacking';

var jets = [];
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%)',
  userSelect: 'none',
  pointerEvents: 'none'
};
var status = {
  roaming: UpdateRoaming,
  attacking: UpdateAttacking
};
var image = {
  straight: require('./images/straight.png'),
  up: require('./images/up.png'),
  down: require('./images/down.png')
};
var speed = 0.65; // How fast does the jet go?
var turnSpeed = 0.15; // How quickly can the jet aim at it's target?
var scale = 1.225; // How large is the jet?

// ** Global Functions ** \\
// Create a jet
export function CreateJet() {
  var pos = initPosition();
  var el = $(`<img src=${image['straight']} class="jet" draggable=false />`);

  // Apply default styles
  el.css(styles);

  // Set initial position
  el.css({
    left: pos.x,
    top: pos.y
  });

  // Create object
  var initialTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  jets[jets.length] = {
    el: el,
    x: pos.x,
    y: pos.y,
    target: initialTarget,
    frame: 'straight',
    angle: 0.5,
    status: 'roaming',
    timer: 0,
    burstTimer: 0,
    shootTimer: 0,
    shotCount: 0
  };

  // Place on DOM
  $('.Game').append(el);
}
setTimeout(function() {
  CreateJet();
}, 1000);

export function UpdateJet(dt) {
  var i = jets.length;
  while (i--) {
    var v = jets[i];

    // Aim towards target
    v.angle = aim(v.angle, v.x, v.y, v.target.x, v.target.y, turnSpeed, dt);

    // Facing the right direction
    var scaleX, scaleY;
    var degrees = toDegrees(v.angle);
    if (degrees >= 270 || degrees <= 90) {
      scaleX = scale;
      scaleY = scale;
    } else {
      scaleX = scale;
      scaleY = -scale;
    }

    // Move towards current angle
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Get / act-on the current action status
    v.status = getStatus();
    status[v.status](v, dt);

    // Aiming down or up
    var targetAngle = Math.atan2(v.y - v.target.y, v.x - v.target.x) + Math.PI;
    var angleDiff = targetAngle - v.angle;
    if (Math.abs(angleDiff) >= 0.1) {
      if (angleDiff < 0) {
        v.frame = 'up';
      } else {
        v.frame = 'down';
      }
    } else {
      v.frame = 'straight';
    }

    // Apply styles
    v.el.css({
      left: v.x,
      top: v.y,
      transform: `translateX(-50%) translateY(-50%) rotate(${v.angle}rad) scaleX(${scaleX}) scaleY(${scaleY})`,
      timer: 0
    });
    v.el.attr('src', image[v.frame]);
  }
}

// ** Helper Functions ** \\

// Start out on a random side of the screen
function initPosition() {
  var side = Math.floor(getRandom(1, 4));
  var x, y;
  if (side === 1) {
    x = -100;
    y = window.innerHeight / 2;
  } else if (side === 2) {
    x = window.innerWidth / 2;
    y = -100;
  } else if (side === 3) {
    x = window.innerWidth + 100;
    y = window.innerHeight / 2;
  } else if (side === 4) {
    x = window.innerWidth / 2;
    y = window.innerHeight + 100;
  }
  return { x: x, y: y };
}

// Return the current action status of the jet
// Roaming - No enemies, free flying
// Attacking - At least one enemy, targeted manouvers
function getStatus() {
  if (quails.length === 0) {
    return 'roaming';
  } else {
    return 'attacking';
  }
}

// Turning towards the mouse
function aim(angle, x, y, targetX, targetY, turnSpeed, dt) {
  var target = { x: targetX, y: targetY };
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

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// Convert to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
