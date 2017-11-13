'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFlash = CreateFlash;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = require('./flash.png');
var lifetime = 100;
var scale = 1.5;
var styles = {
  position: 'absolute',
  userSelect: 'none',
  pointerEvents: 'none',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%) scale(' + scale + ')'
};

function CreateFlash(x, y) {
  var el = (0, _jquery2.default)('<img src=' + image + ' class="flash" />');

  // Apply basic styles
  el.css(styles);

  // Apply position
  el.css({ left: x, top: y });

  // Add
  (0, _jquery2.default)('.Game').append(el);

  // Remove after a set time
  live(el);
}

// Remove after a set time
function live(el) {
  setTimeout(function () {
    el.remove();
  }, lifetime);
}