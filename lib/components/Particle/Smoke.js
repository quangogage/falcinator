import $ from 'jquery';

var container = [];

// Adjustable variables
var size = [10, 20]; // How big does is it upon creation?
var colorFadeSpeed = [0.00025, 0.0005]; // How quickly does it fade to black?
var sizeFadeSpeed = [0.05, 0.066]; // How quickly does it shrink?
var initialColor = [244, 125, 66]; // What color is it upon creation? (RGB)

// Default styles
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated',
  userSelect: 'none',
  transformOrigin: '50% 50%',
  width: size,
  height: size,
  zIndex: -1
};

class Smoke {
  // Create it
  play(x, y, angle) {
    var el = $(`<div class="particle-smoke"></div>`);
    var thisSize = getRandom(size[0], size[1]);

    // Default styles
    el.css(styles);

    // Positioning
    el.css({ left: x, top: y });

    // Create the object
    container[container.length] = {
      el: el,
      x: x,
      y: y,
      color: [initialColor[0], initialColor[1], initialColor[2]],
      size: thisSize,
      shrinkSpeed:
        getRandom(sizeFadeSpeed[0] * 100, sizeFadeSpeed[1] * 100) / 100,
      colorSpeed:
        getRandom(colorFadeSpeed[0] * 100, colorFadeSpeed[1] * 100) / 100
    };

    // Initial color
    el.css({
      backgroundColor: `RGB(${initialColor[0]},${initialColor[1]},${initialColor[2]})`
    });

    // Add to DOM
    $('.Game').append(el);
  }
  update(dt) {
    var i = container.length;
    while (i--) {
      var v = container[i];

      // Shrinking
      v.size -= v.shrinkSpeed * dt;

      // Color fade
      if (v.color[0] > 0) {
        v.color[0] -= v.colorSpeed * dt;
      }
      if (v.color[1] > 0) {
        v.color[1] -= v.colorSpeed * dt;
      }
      if (v.color[2] > 0) {
        v.color[2] -= v.colorSpeed * dt;
      }

      // Applying to element
      v.el.css({
        width: v.size,
        height: v.size,
        backgroundColor: `RGB(${Math.floor(v.color[0])},${Math.floor(
          v.color[1]
        )},${Math.floor(v.color[2])})`
      });

      // Removing
      if (v.size <= 0) {
        v.el.remove();
        container.splice(i, 1);
      }
    }
  }
}

// ** Helper Functions ** \\
// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export default new Smoke();
