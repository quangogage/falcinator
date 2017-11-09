import $ from 'jquery';
var beams = [];

// Initial styles
var styles = {
  position: 'absolute',
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

export function shootBeam(mouseX, flags) {
  var el = $('<div class="beam"></div>');
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
  $('.Game').append(el);
}

export function updateBeam(dt) {
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
      transform: `translateX(-${v.width / 2}px)`
    });

    // Remove after sustain and shrink
    if (v.fullWidth && v.timer >= sustain && v.width <= 0) {
      v.el.remove();
      beams.splice(i, 1);
    }
  }
}

// Flashes
function createFlash(x) {
  var flash = $('<div class="beam-flash"></div>');

  // Basic styles
  flash.css(styles);
  flash.css({ background: 'blue', left: x, transformOrigin: '100%' });

  flash.animate(
    {
      width: maxWidth * 2
    },
    {
      duration: 350,
      queue: false,
      complete: function() {
        flash.remove();
      }
    }
  );

  $('.Game').append(flash);
}
