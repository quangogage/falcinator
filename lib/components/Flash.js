import $ from 'jquery';

var image = require('./flash.png');
var lifetime = 100;
var scale = 2;
var styles = {
  position: 'absolute',
  userSelect: 'none',
  pointerEvents: 'none',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%) scale(' + scale + ')'
};

export function CreateFlash(x, y) {
  var el = $(`<img src=${image} class="flash" />`);

  // Apply basic styles
  el.css(styles);

  // Apply position
  el.css({ left: x, top: y });

  // Add
  $('.Game').append(el);

  // Remove after a set time
  live(el);
}

// Remove after a set time
function live(el) {
  setTimeout(function() {
    el.remove();
  }, lifetime);
}
