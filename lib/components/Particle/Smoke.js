import $ from 'jquery';

var container = [];

// Default styles
var styles = {
  position: 'absolute',
  imageRender: 'pixelated',
  userSelect: 'none'
};

// Adjustable variables
var size = 25; // How big does is it upon creation?
var colorFadeSpeed = 1; // How quickly does it fade to black?
var sizeFadeSpeed = 0.75; // How quickly does it shrink?

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
      color: [244, 125, 66]
    };

    // Add to DOM
    $('.Game').append(el);
  }
  update(dt) {}
}

export default new Smoke();
