'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBlood = loadBlood;
exports.resizeBlood = resizeBlood;
exports.createBlood = createBlood;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container;
var splatters = [require('./images/splatter 1.png'), require('./images/splatter 2.png'), require('./images/splatter 3.png'), require('./images/splatter 4.png'), require('./images/splatter 5.png')];

// Adjustable variables
var scaleRange = [2.25, 3.5]; // How large can the blood be?
var lifetime = 85000; // How long does the blood remain visible?

function loadBlood() {
  container = (0, _jquery2.default)('<div class="blood-container"></div>');
  container.css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  });
  (0, _jquery2.default)('.Game').append(container);
}
function resizeBlood() {}
function createBlood(x, y, angle) {
  var splatter = splatters[Math.floor(getRandom(0, splatters.length - 1))];
  var image = (0, _jquery2.default)('<img src="' + splatter + '" class="blood" draggable=\'false\'/>');
  var scale = getRandom(scaleRange[0] * 100, scaleRange[1] * 100) / 100;
  image.css({
    left: x,
    top: y,
    transform: 'rotate(' + (angle + Math.PI / 2) + 'rad) scale(' + scale + ')'
  });
  container.append(image);
  live(image);
}

// Remove after set lifetime
function live(el) {
  setTimeout(function () {
    el.animate({
      opacity: 0
    }, {
      duration: 500,
      queue: false,
      complete: function complete() {
        el.remove();
      }
    });
  }, lifetime);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}