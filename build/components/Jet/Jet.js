'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateJet = CreateJet;
exports.UpdateJet = UpdateJet;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Quail = require('../Quail/Quail');

var _Roaming = require('./Roaming');

var _Roaming2 = _interopRequireDefault(_Roaming);

var _Attacking = require('./Attacking');

var _Attacking2 = _interopRequireDefault(_Attacking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jets = [];
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%)',
  userSelect: 'none',
  pointerEvents: 'none'
};
var status = {
  roaming: _Roaming2.default,
  attacking: _Attacking2.default
};
var image = {
  straight: require('./images/straight.png'),
  up: require('./images/up.png'),
  down: require('./images/down.png')
};
var speed = 0.1; // How fast does the jet go?
var turnSpeed = 0.25; // How quickly can the jet aim at it's target?

// ** Global Functions ** \\
// Create a jet
function CreateJet() {
  var pos = initPosition();
  var el = (0, _jquery2.default)('<img src=' + image['straight'] + ' class="jet" draggable=false />');

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
    angle: getTargetAngle(pos, initialTarget),
    status: 'roaming',
    timer: 0
  };

  // Place on DOM
  (0, _jquery2.default)('.Game').append(el);
}
setTimeout(function () {
  CreateJet();
}, 1000);

function UpdateJet(dt) {
  var i = jets.length;
  while (i--) {
    var v = jets[i];

    // Aim towards target
    v.angle = getTargetAngle(v, v.target);

    // Facing the right direction
    var scaleX, scaleY;
    if (v.angle >= Math.PI / 2) {
      scaleX = 1;
      scaleY = 1;
    } else {
      scaleX = 1;
      scaleY = -1;
    }
    console.log(v.angle);

    // Move towards current angle
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Get / act-on the current action status
    v.status = getStatus();
    status[v.status](v, dt);

    // Apply styles
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'translateX(-50%) translateY(-50%) rotate(' + v.angle + 'rad) scaleX(' + scaleX + ') scaleY(' + scaleY + ')',
      timer: 0
    });
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
  return { x: 100, y: 100 };
  return { x: x, y: y };
}

// Return the angle to a set position
function getTargetAngle(jet, target) {
  return Math.atan2(target.y - jet.y, target.x - jet.x);
}

// Return the current action status of the jet
// Roaming - No enemies, free flying
// Attacking - At least one enemy, targeted manouvers
function getStatus() {
  if (_Quail.quails.length === 0) {
    return 'roaming';
  } else {
    return 'attacking';
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}