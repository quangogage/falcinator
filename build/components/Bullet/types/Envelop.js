'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Bullet = require('../Bullet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = require('../envelop.jpg');

var styles = {
  position: 'absolute'
};
var Envelop = {
  name: 'envelop',

  // Creating an envelop bullet
  create: function create(originX, originY, targetX, targetY) {
    var el, angle;

    // Create element/Basic styles
    el = (0, _jquery2.default)('<img src=' + img + ' class="bullet"/>');
    el.css(styles);

    // Calculate Direction / Point in that direction
    angle = Math.atan2(targetY - originY, targetX - targetX);
    el.css({ transform: 'rotate(' + angle + 'rad)' });

    // Init the object
    _Bullet.bullets[_Bullet.bullets.length] = {
      type: 'envelop',
      el: el,
      x: originX,
      y: originY,
      angle: angle
    };
  },
  update: function update(dt) {}
};

exports.default = Envelop;