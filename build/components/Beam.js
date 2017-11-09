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
  position: 'absolute',
  top: 0,
  width: 0,
  height: '100%',
  transition: '0.5s',
  transformOrigin: '50% 50%',
  background: 'red'
};

// Adjustable variables
var growSpeed = 0.5; // How quickly does it's width grow?
var lifetime = 750; // How long does it live for?
var maxWidth = 50; // How wide does it get?

function shootBeam(mouseX) {
  var el = (0, _jquery2.default)('<div class+="beam"></div>');

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
    timer: 0
  };

  // Place on DOM
  (0, _jquery2.default)('.Game').append(el);
}

function updateBeam(dt) {
  for (var i = 0; i < beams.length; i++) {
    var v = beams[i];

    // Grow
    if (v.width < maxWidth) {
      v.width += growSpeed * dt;
    }

    // Apply to element
    v.el.css({
      width: v.width
    });

    // Livin' life
    v.timer += dt;
    if (v.timer >= lifetime) {
      v.el.remove();
      beams.splice(i, 1);
    }
  }
}