import $ from 'jquery';
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

export function shootBeam(mouseX) {
  var el = $('<div class+="beam"></div>');

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
  $('.Game').append(el);
}

export function updateBeam(dt) {
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
