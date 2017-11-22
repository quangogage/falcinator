'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerLoseExplosion = TriggerLoseExplosion;
exports.UpdateLoseExplosion = UpdateLoseExplosion;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frames = [require('./images/lose explosion/1.png'), require('./images/lose explosion/2.png'), require('./images/lose explosion/3.png'), require('./images/lose explosion/4.png'), require('./images/lose explosion/5.png'), require('./images/lose explosion/6.png'), require('./images/lose explosion/7.png'), require('./images/lose explosion/8.png'), require('./images/lose explosion/9.png'), require('./images/lose explosion/10.png'), require('./images/lose explosion/11.png'), require('./images/lose explosion/12.png')];
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated'
};
var framerate = 75;
var animTimer = 0;
var frame = 0;
var scale = 0.7;
var el;

function TriggerLoseExplosion(x, y) {
  el = (0, _jquery2.default)('<img src=' + frames[0] + ' class="lose-explosion" />');
  el.css(styles);
  el.css({
    left: x,
    top: y,
    transform: 'translateX(-50%) translateY(-50%) scale(' + scale + ')'
  });
  (0, _jquery2.default)('.Game').append(el);
}
function UpdateLoseExplosion(dt) {
  if (el) {
    animTimer += dt;
    if (animTimer >= framerate) {
      if (frame !== frames.length - 1) {
        frame += 1;
      }
      el.attr('src', frames[frame]);
      if (frame === frames.length - 1) {
        el.remove();
      }
      animTimer = 0;
    }
  }
}