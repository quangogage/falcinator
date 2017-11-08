'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Bullet = require('../Bullet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = require('../cannonball.png');

var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%',
  imageRendering: 'pixelated',
  userSelect: 'none'
};

// Adjustable Variables
var speed = 0.5;

var CannonBall = {
  name: 'cannonball',

  // Creating an Cannonball bullet
  create: function create(originX, originY, targetX, targetY, obj) {
    var el, angle;

    // Create element/Basic styles
    el = (0, _jquery2.default)('<img src=' + img + ' class="bullet"/>');
    el.css(styles);

    // Calculate Direction
    angle = Math.atan2(targetY - originY, targetX - originX);

    // Init the object
    obj.type = 'cannonball';
    obj.el = el;
    obj.x = originX;
    obj.y = originY;
    obj.angle = angle;

    // Set initial position/rotation of element
    var cssAngle = angle + Math.PI / 2;
    el.css({
      left: originX,
      top: originY,
      transform: 'rotate(' + cssAngle + 'rad)'
    });

    // Place element on DOM
    (0, _jquery2.default)('.Game').append(el);
  },
  update: function update(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply to element
    var newAngle = v.angle + Math.PI / 2;
    v.el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + newAngle + 'rad)'
    });
  }
};

exports.default = CannonBall;