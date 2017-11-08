import $ from 'jquery';
import { bullets } from '../Bullet';
const img = require('../envelope.jpg');

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
  create: function(originX, originY, targetX, targetY, obj) {
    var el, angle;

    // Create element/Basic styles
    el = $(`<img src=${img} class="bullet"/>`);
    el.css(styles);

    // Calculate Direction
    angle = Math.atan2(targetY - originY, targetX - originX);

    // Init the object
    obj.type = 'envelop';
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
    $('.Game').append(el);
  },
  update: function(i, v, dt) {
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

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

export default Envelop;
