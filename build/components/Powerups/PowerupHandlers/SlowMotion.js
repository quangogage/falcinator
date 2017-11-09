'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowMotion = SlowMotion;
exports.handleSlowMo = handleSlowMo;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _HandlePowerups = require('../HandlePowerups');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SlowMotion(dt) {}

// Overlay
var image = require('../intense.png');
var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: '4s',
  opacity: 0,
  userSelect: 'none',
  pointerEvents: 'none'
};
var zoomSet = false;

function handleSlowMo(dt, now, lastUpdate) {
  var isActive = _HandlePowerups.powerupList[1].active;
  if (isActive === true) {
    // Slow down delta time
    var newDt = (now - lastUpdate) / 2;

    // Overlay
    if ((0, _jquery2.default)('.intense').length === 0) {
      var el = (0, _jquery2.default)('<img src=' + image + ' class="intense" />');
      el.css(styles);
      (0, _jquery2.default)('.Game').append(el);
    } else {
      (0, _jquery2.default)('.intense').css({ opacity: 1 });
    }

    // Zoom in
    if (zoomSet === false) {
      (0, _jquery2.default)('.Game').css({ transform: 'scale(1.05)' });
      zoomSet = true;
    }

    return newDt;
  } else {
    (0, _jquery2.default)('.intense').css({ opacity: 0 });
    if (zoomSet === true) {
      (0, _jquery2.default)('.Game').css({ transform: 'scale(1)' });
    }

    return now - lastUpdate;
  }
}