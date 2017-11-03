'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HandlePowerups;

var _FastShooting = require('./PowerupHandlers/FastShooting');

var powerupList = [{
  name: 'fast shooting',
  func: _FastShooting.FastShooting
}];

function HandlePowerups() {
  powerupList[0].func();
}