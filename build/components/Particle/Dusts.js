'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = [{
  name: 'confetti',
  images: [require('./images/confetti/1.png'), require('./images/confetti/2.png'), require('./images/confetti/3.png'), require('./images/confetti/4.png'), require('./images/confetti/5.png')],
  spread: 0.9,
  friction: 0.00045,
  amount: [10, 15],
  initialXSpeed: [0.6, 0.85],
  initialYSpeed: [0.6, 1.2],
  rotSpeed: [0.42, 1.02],
  rotFriction: 0.00045,
  gravity: 0.00071
}, {
  name: 'blood',
  images: [require('./images/blood/1.png')],
  spread: Math.PI * 0.366,
  friction: 0.00025,
  scale: [7, 10],
  amount: [2, 4],
  initialXSpeed: [0.3, 0.6],
  initialYSpeed: [0.3, 0.6],
  rotSpeed: [0.76, 0.95],
  rotFriction: 0.00035,
  gravity: 0.00075
}, {
  name: 'gold dust',
  images: [require('./images/gold dust/1.png')],
  spread: Math.PI * 0.366,
  friction: 0.000025,
  scale: [7, 10],
  amount: [2, 4],
  initialXSpeed: [0.1, 0.22],
  initialYSpeed: [0.1, 0.22],
  rotSpeed: [0.76, 0.95],
  rotFriction: 0.00035,
  gravity: 0.0005
}];

var container = [];

var Dust = function () {
  function Dust() {
    _classCallCheck(this, Dust);
  }

  _createClass(Dust, [{
    key: 'play',
    value: function play(x, y, angle, typeIndex) {
      // Create the burst
      var typeIndex = typeIndex || 0;
      var type = types[typeIndex];
      var amount = getRandom(type.amount[0], type.amount[1]);
      for (var i = 0; i < amount; i++) {
        this.createOne(x, y, type, angle);
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      // Update the dusts
      for (var i = 0; i < container.length; i++) {
        var v = container[i];

        // Movement
        v.x = v.x + v.xSpeed * dt;
        v.y = v.y + v.ySpeed * dt;
        v.ySpeed = v.ySpeed + v.gravity * dt;

        // Rotating
        if (v.rotSpeed > 0) {
          v.rotSpeed -= v.rotFriction * dt;
          v.rotation += v.rotSpeed * dt;
        }

        // Removing when off-screen
        if (v.x < 0 || v.x > window.innerWidth || v.y > window.innerHeight) {
          this.deleteOne(i, v);
        }

        v.el.css({
          left: v.x,
          top: v.y,
          transform: 'rotate(' + v.rotation + 'deg) scale(' + v.scale + ')'
        });
      }
    }
  }, {
    key: 'createOne',
    value: function createOne(x, y, type, angle) {
      var image = type.images[Math.floor(getRandom(0, type.images.length - 1))];
      var el = (0, _jquery2.default)('<img class="dust ' + type.name + '" src=' + image + ' draggable="false"></div>');
      var xvel, yvel;
      var randomSpread = getRandom(-type.spread * 100, type.spread * 100) / 100;
      angle += Math.PI + randomSpread;
      var xSpeed = Math.cos(angle + Math.PI * 1) * getRandom(type.initialXSpeed[0] * 100, type.initialXSpeed[1] * 100) / 100;
      var ySpeed = Math.sin(angle) * getRandom(type.initialYSpeed[0] * 100, type.initialYSpeed[1] * 100) / 100;
      var rotSpeed = getRandom(type.rotSpeed[0] * 100, type.rotSpeed[1] * 100) / 100;
      var rotation = getRandom(-360, 360);
      var scale = 10;
      if (type.scale) {
        // Custom scales
        scale = getRandom(type.scale[0] * 100, type.scale[1] * 100) / 100;
      }

      // Applying variables to element
      el.css({
        left: x,
        top: y,
        transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')'
      });

      // Storing in container array
      container[container.length] = {
        x: x,
        y: y,
        el: el,
        timer: 0,
        xSpeed: xSpeed,
        ySpeed: -ySpeed,
        scale: scale,
        friction: type.friction,
        rotation: rotation,
        rotSpeed: rotSpeed,
        rotFriction: type.rotFriction,
        gravity: type.gravity
      };

      // Place it in the game
      (0, _jquery2.default)('.Game').append(el);
    }
  }, {
    key: 'deleteOne',
    value: function deleteOne(i, v) {
      _jquery2.default.when(v.el.remove()).then(container.splice(i, 1));
    }
  }]);

  return Dust;
}();

// Get a random number between two values


function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

exports.default = new Dust();