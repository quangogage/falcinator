'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shootBeam = shootBeam;
exports.updateBeam = updateBeam;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beams = [];

// Initial styles
var styles = {
  position: 'relative',
  top: 0,
  width: 0,
  height: '100%',
  background: 'red'
};

// Adjustable variables
var growSpeed = 0.35; // How quickly does it's width grow?
var maxWidth = 50; // How wide does it get?
var sustain = 500; // How long does it stay at full width?
var shrinkSpeed = 1; // How quickly does it shrink after it's sustained full width?

function shootBeam(mouseX, flags) {
  var el = (0, _jquery2.default)('<div class="beam"></div>');
  var beamFlags = flags || {};

  // Element styles
  el.css(styles);
  el.css({
    left: mouseX
  });

  // Create object
  beams[beams.length] = {
    x: mouseX,
    width: 0,
    el: el,
    timer: 0,
    flags: beamFlags
  };

  // Flash effect
  createFlash(mouseX);

  // Place on DOM
  (0, _jquery2.default)('.Game').append(el);
}

function updateBeam(dt) {
  var i = beams.length;
  while (i--) {
    var v = beams[i];

    // Grow
    if (v.width <= maxWidth && !v.fullWidth) {
      v.width += growSpeed * dt;
    }

    // Shrink
    if (v.width >= maxWidth) {
      v.fullWidth = true;
    }
    if (v.fullWidth) {
      v.timer += dt;
    }
    if (v.fullWidth && v.timer >= sustain) {
      v.width -= shrinkSpeed * dt;
    }

    // Apply to element
    v.el.css({
      width: v.width,
      transform: 'translateX(-' + v.width / 2 + 'px)'
    });

    // Remove after sustain and shrink
    if (v.fullWidth && v.timer >= sustain && v.width <= 0) {
      v.el.remove();
      beams.splice(i, 1);
    }
  }
}

// Flashes
function createDepth(el) {
  var left = (0, _jquery2.default)('<div class="beam-depth"></div>');
  left.css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '25%',
    height: '100%',
    background: 'black'
  });

  el.append(left);
}