import $ from 'jquery';

var image = require('./flash.png');
var lifetime = 100;
var styles = {
  position: 'absolute',
  userSelect: 'none',
  pointerEvents: 'none',
  imageRendering: 'pixelated'
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
