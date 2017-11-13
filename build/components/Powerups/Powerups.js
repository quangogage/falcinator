'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePowerups = updatePowerups;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _GeneratePowerups = require('./GeneratePowerups');

var _GeneratePowerups2 = _interopRequireDefault(_GeneratePowerups);

var _Dusts = require('../Particle/Dusts');

var _Dusts2 = _interopRequireDefault(_Dusts);

var _HandlePowerups = require('./HandlePowerups');

var _Bullet = require('../Bullet/Bullet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = [];
var frames = [require('./frames/1.png'), require('./frames/2.png'), require('./frames/3.png')];

var speed = 0.5; // Zoom zoom.
var framerate = 68; // Animation framerate
var dustAmountRange = [5, 10]; // How much dust spawns when a powerup is hit?
var scale = 0.9; // How large is the powerup quail compared to the normal quail?

// ** Global Functions ** \\
function updatePowerups(dt) {
  // Generation
  (0, _GeneratePowerups2.default)(spawnPowerup, dt);
  // Handle these bad bois
  (0, _HandlePowerups.HandlePowerups)(dt);

  var i = container.length;
  while (i--) {
    var v = container[i];

    // Movement
    v.x += speed * v.dir * dt;

    // Animation
    animPowerup(v, dt);

    // Going off screen
    if (v.x > window.innerWidth + 100 || v.x < -100) {
      v.el.remove();
      container.splice(i, 1);
    }

    // Applying changes to DOM element
    v.el.css({ left: v.x });
    v.el.attr('src', frames[v.frame]);

    // Shooting
    for (var ia = _Bullet.bullets.length - 1; ia >= 0; ia--) {
      var va = _Bullet.bullets[ia];
      var quailX = v.x;
      var quailY = v.y;
      var quailWidth = v.el.width();
      var quailHeight = v.el.height();
      var bulletX = va.x;
      var bulletY = va.y;

      if (bulletX > quailX && bulletX < quailX + quailWidth && bulletY > quailY && bulletY < quailY + quailHeight) {
        v.setToDelete = true;
        va.setToDelete = true; // Actually gets deleted inside of Bullet.js
        (0, _HandlePowerups.activatePowerup)();
      }
    }
    if (v.setToDelete === true) {
      killPowerup(i);
    }
  }
}

// ** Helper Functions ** \\
function spawnPowerup() {
  var el = (0, _jquery2.default)('<img src=' + frames[0] + ' draggable="false" />');
  var side = getRandom(0, 100);
  var x, dir;
  var y = getRandom(0, window.innerHeight);

  // Left or right
  if (side >= 50) {
    x = -50;
    dir = 1;
  } else {
    x = window.innerWidth;
    dir = -1;
  }

  // Apply styles
  el.css({
    position: 'absolute',
    left: x,
    top: y,
    imageRendering: 'pixelated',
    userSelect: 'none',
    width: '45px',
    height: '45px',
    filter: 'drop-shadow(2px 2px RGBA(0,0,0,0.4))',
    transform: 'scale(' + scale + ')'
  });

  // Create object
  container[container.length] = {
    x: x,
    y: y,
    dir: dir,
    frame: 0,
    animTimer: 0,
    el: el
  };

  // Add to DOM
  (0, _jquery2.default)('.Game').append(el);
}

// ** Helper Functions ** \\
// Run the animation
function animPowerup(v, dt) {
  v.animTimer = v.animTimer + dt;
  if (v.animTimer > framerate) {
    if (v.animDir === 1) {
      if (v.frame === frames.length - 1) {
        v.frame--;
        v.animDir = -1;
      } else {
        v.frame++;
      }
      v.animTimer = 0;
    } else {
      if (v.frame === 0) {
        v.frame++;
        v.animDir = 1;
      } else {
        v.frame--;
      }
      v.animTimer = 0;
    }
  }
}
// ⚰️
function killPowerup(i) {
  var v = container[i];
  // Remove DOM element.
  v.el.remove();
  // Remove array object.
  container.splice(i, 1);
  // Generate dust.
  var amount = getRandom(dustAmountRange[0], dustAmountRange[1]);
  for (var i = 0; i < amount; i++) {
    _Dusts2.default.play(v.x + v.el.width() / 2, v.y + v.el.height() / 2, getRandom(-10, 10), 2);
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}