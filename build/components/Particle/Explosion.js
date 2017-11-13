'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var frames = [require('./images/explosion/1.png'), require('./images/explosion/2.png'), require('./images/explosion/3.png'), require('./images/explosion/4.png'), require('./images/explosion/5.png')];

// Adjustable variables
var framerate = 200; // How long is each animation frame?
var scaleRange = [1.35, 2]; // How big is the element?

var Explosion = function () {
  function Explosion() {
    _classCallCheck(this, Explosion);
  }

  _createClass(Explosion, [{
    key: 'play',
    value: function play(x, y) {
      var frame = 0;
      var div = (0, _jquery2.default)('<img src=' + frames[0] + ' class="explosion" draggable="false" />');
      var rotation = getRandom(0, 360);
      var scale = getRandom(scaleRange[0] * 100, scaleRange[1] * 100) / 100;
      div.css({
        left: x,
        top: y,
        transform: 'translateX(-50%) translateY(-50%) rotate(' + rotation + 'deg)',
        scale: scale
      });
      (0, _jquery2.default)('.Game').append(div);
      var animation = setInterval(function () {
        frame += 1;
        div.attr('src', frames[frame]);
        if (frame >= frames.length - 1) {
          div.remove();
          clearInterval(animation);
        }
      }, framerate);
    }
  }]);

  return Explosion;
}();

function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

exports.default = new Explosion();