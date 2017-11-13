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

var framerate = 75;

var Explosion = function () {
  function Explosion() {
    _classCallCheck(this, Explosion);
  }

  _createClass(Explosion, [{
    key: 'play',
    value: function play(x, y) {
      var frame = 0;
      var turned = false;
      var div = (0, _jquery2.default)('<img src=' + frames[0] + ' class="explosion" draggable="false" />');
      div.css({
        left: x,
        top: y,
        transform: 'translateX(-50%) translateY(-50%)'
      });
      (0, _jquery2.default)('.Game').append(div);
      var animation = setInterval(function () {
        if (turned === false) {
          if (frame === frames.length - 1) {
            turned = true;
          } else {
            frame += 1;
          }
        } else {
          if (frame !== 0) {
            frame -= 1;
          } else {
            if (frame >= frames.length - 1) {
              div.remove();
              clearInterval(animation);
            }
          }
        }
        div.attr('src', frames[frame]);
      }, framerate);
    }
  }]);

  return Explosion;
}();

exports.default = new Explosion();