'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cannonballs = undefined;
exports.ShootCannonBall = ShootCannonBall;
exports.UpdateCannonBall = UpdateCannonBall;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _HandlePowerups = require('../Powerups/HandlePowerups');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = require('./cannonball.png');
var styles = {
  position: 'absolute'
};
var cannonballs = exports.cannonballs = [];

// Shoot a cannonball
function ShootCannonBall(mouseX, mouseY, ship) {
  if (_HandlePowerups.powerupList[4].active === true) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
    var el = (0, _jquery2.default)('<img src=' + image + ' class="cannonball" />');

    cannonballs[cannonballs.length] = {
      el: el,
      x: shipX,
      y: shipY,
      angle: angle,
      rotation: 0
    };

    (0, _jquery2.default)('.Game').append(el);
  }
}

// Update loop
function UpdateCannonBall(dt) {}