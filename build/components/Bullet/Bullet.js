'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullets = undefined;
exports.shootBullet = shootBullet;
exports.updateBullets = updateBullets;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Camera = require('./Camera/Camera');

var _BurstShot = require('./Powerups/PowerupHandlers/BurstShot');

var _HandlePowerups = require('./Powerups/HandlePowerups');

var _Envelop = require('./types/Envelop');

var _Envelop2 = _interopRequireDefault(_Envelop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = exports.bullets = [];
var speed = 1;
var cannonball = require('./cannonball.png');

var types = [_Envelop2.default];

// ** Global Functions ** \\
function shootBullet(originX, originY, targetX, targetY, type) {
  var type = type || 'envelop';
  var thisType = getBulletType(type);

  // Create it
  thisType.create(originX, originY, targetX, targetY);
}
function updateBullets(dt) {}

// ** Helper Functions ** \\

// Get a bullet object by it's name
function getBulletType(name) {
  for (var i = 0; i < types.length; i++) {
    var thisType = types[i];
    if (thisType.name === name) {
      return thisType;
    }
  }
}