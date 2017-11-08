'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Bullet = require('../Bullet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = require('../envelope.jpg');

var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%',
  imageRendering: 'pixelated'
};

// Adjustable Variables
var speed = 1;

var Envelop = {
  name: 'envelop',

  // Creating an envelop bullet
  create: function create(originX, originY, targetX, targetY) {
    var el, angle;

    // Create element/Basic styles
    el = (0, _jquery2.default)('<img src=' + img + ' class="bullet"/>');
    el.css(styles);

    // Calculate Direction / Point in that direction
    angle = Math.atan2(targetY - originY, targetX - originX);
    el.css({ transform: 'rotate(' + angle + Math.PI + 'rad)' });

    // Init the object
    _Bullet.bullets[_Bullet.bullets.length] = {
      type: 'envelop',
      el: el,
      x: originX,
      y: originY,
      angle: angle
    };

    // Place element on DOM
    (0, _jquery2.default)('.Game').append(el);
  },
  update: function update(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply to element
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + v.angle + Math.PI + 'rad)'
    });
  }
};

exports.default = Envelop;