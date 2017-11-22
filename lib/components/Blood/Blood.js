import $ from 'jquery';

var container;
var splatters = [
  require('./images/splatter 1.png'),
  require('./images/splatter 2.png'),
  require('./images/splatter 3.png'),
  require('./images/splatter 4.png'),
  require('./images/splatter 5.png')
];

// Adjustable variables
var scaleRange = [2.25, 3.5]; // How large can the blood be?
var lifetime = 85000; // How long does the blood remain visible?

export function loadBlood() {
  container = $('<div class="blood-container"></div>');
  container.css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  });
  $('.Game').append(container);
}
export function resizeBlood() {}
export function createBlood(x, y, angle) {
  var splatter = splatters[Math.floor(getRandom(0, splatters.length - 1))];
  var image = $(`<img src="${splatter}" class="blood" draggable='false'/>`);
  var scale = getRandom(scaleRange[0] * 100, scaleRange[1] * 100) / 100;
  image.css({
    left: x,
    top: y,
    transform: `rotate(${angle + Math.PI / 2}rad) scale(${scale})`
  });
  container.append(image);
  live(image);
}

// Remove after set lifetime
function live(el) {
  setTimeout(function() {
    el.animate(
      {
        opacity: 0
      },
      {
        duration: 500,
        queue: false,
        complete: function() {
          el.remove();
        }
      }
    );
  }, lifetime);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
