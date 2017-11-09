import $ from 'jquery';

var container = [];

// Adjustable variables
var size = 25; // How big does is it upon creation?
var colorFadeSpeed = 0.1; // How quickly does it fade to black?
var sizeFadeSpeed = 0.005; // How quickly does it shrink?
var initialColor = [244, 125, 66]; // What color is it upon creation? (RGB)

// Default styles
var styles = {
  position: 'absolute',
  imageRender: 'pixelated',
  userSelect: 'none',
  transformOrigin: '50% 50%',
  width: size,
  height: size
};

class Smoke {
  // Create it
  play(x, y, angle) {
    var el = $(`<div class="particle-smoke"></div>`);

    // Default styles
    el.css(styles);

    // Positioning
    el.css({ left: x, top: y });

    // Create the object
    container[container.length] = {
      el: el,
      x: x,
      y: y,
      color: initialColor,
      size: size
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
      v.size -= sizeFadeSpeed * dt;

      /* Color fade
      for (var ib = 0; ib < 3; ib++) {
        v.color[ib] -= colorFadeSpeed * dt;
      }
      */

      // Applying to element
      v.el.css({
        width: v.size,
        height: v.size,
        backgroundColor: `RGB(${v.color[0]},${v.color[1]},${v.color[2]})`
      });

      // Removing
      if (v.size <= 0) {
        v.el.remove();
        container.splice(i, 1);
      }
    }
  }
}

export default new Smoke();
