'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Smoke = function () {
  function Smoke() {
    _classCallCheck(this, Smoke);
  }

  _createClass(Smoke, [{
    key: 'play',

    // Create it
    value: function play(x, y, angle) {
      var el = (0, _jquery2.default)('<div class="particle-smoke"></div>');

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
        backgroundColor: 'RGB(' + initialColor[0] + ',' + initialColor[1] + ',' + initialColor[2] + ')'
      });

      // Add to DOM
      (0, _jquery2.default)('.Game').append(el);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      var i = container.length;
      while (i--) {
        var v = container[i];
        var newColor;

        // Shrinking
        v.size -= sizeFadeSpeed * dt;

        // Color fade
        v.color[0] -= colorFadeSpeed * dt;
        v.color[1] -= colorFadeSpeed * dt;
        v.color[2] -= colorFadeSpeed * dt;
        console.log(v.color);

        // Applying to element
        v.el.css({
          width: v.size,
          height: v.size,
          backgroundColor: 'RGB(' + v.color[0] + ',' + v.color[1] + ',' + v.color[2] + ')'
        });

        // Removing
        if (v.size <= 0) {
          v.el.remove();
          container.splice(i, 1);
        }
      }
    }
  }]);

  return Smoke;
}();

exports.default = new Smoke();