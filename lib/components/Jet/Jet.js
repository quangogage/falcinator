import $ from 'jquery';

var jets = [];

// Default styles
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%)',
  userSelect: 'none',
  pointerEvents: 'none'
};

// Images
var image = {
  straight: require('./images/straight.png'),
  up: require('./images/up.png'),
  down: require('./images/down.png')
};

// Adjustable variables
var speed = 0.1; // How fast does the jet go?
var turnSpeed = 0.25; // How quickly can the jet aim at it's target?

// ** Global Functions ** \\
export function CreateJet() {
  var pos = initPosition();
  var el = $(`<img src=${straight} class="jet" draggable=false />`);

  // Apply default styles
  el.css(styles);

  // Set initial position
  el.css({
    left: pos.x,
    top: pos.y
  });

  // Create object
  var initialTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  jets[jets.length - 1] = {
    el: el,
    x: pos.x,
    y: pos.y,
    target: initialTarget,
    angle: getTargetAngle(pos, initialTarget)
  };

  // Place on DOM
  $('.Game').append(el);
}

export function UpdateJet(dt) {
  var i = jets.length;
  while (i--) {
    var v = jets[i];

    // Aim towards target
    v.angle = getTargetAngle(v, v.target);

    // Move towards current angle
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply styles
    v.el.css({
      left: v.x,
      top: v.y,
      transform: `translateX(-50%) translateY(-50%) rotate(${v.angle}rad)`
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

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
