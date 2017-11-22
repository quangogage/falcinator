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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = exports.bullets = [];
var speed = 1;
var cannonball = require('./cannonball.png');

var types = [{
  name: 'envelop',
  image: 'require("./Quail/envelope.jpg")'
}];

// ** Global Functions ** \\
function shootBullet(originX, originY, targetX, targetY, type) {}
function updateBullets(dt) {}

// ** Helper Functions ** \\