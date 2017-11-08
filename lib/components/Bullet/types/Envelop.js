import $ from 'jquery';
import { bullets } from '../Bullet';
const img = require('../envelope.jpg');

var styles = {
  position: 'absolute',
  transformOrigin: '50% 50%'
};

// Adjustable Variables
var speed = 1;

var Envelop = {
  name: 'envelop',

  // Creating an envelop bullet
  create: function(originX, originY, targetX, targetY) {
    var el, angle;

    // Create element/Basic styles
    el = $(`<img src=${img} class="bullet"/>`);
    el.css(styles);

    // Calculate Direction / Point in that direction
    angle = Math.atan2(targetY - originY, targetX - targetX);
    el.css({ transform: 'rotate(' + angle + 'rad)' });

    // Init the object
    bullets[bullets.length] = {
      type: 'envelop',
      el: el,
      x: originX,
      y: originY,
      angle: angle
    };

    // Place element on DOM
    $('.Game').append(el);
  },
  update: function(i, v, dt) {
    // Move position
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply to element
    v.el.css({ left: v.x, top: v.y });
  }
};

export default Envelop;
