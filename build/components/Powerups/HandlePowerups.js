'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HandlePowerups;
var powerupList = [{
  name: 'fast shooting',
  func: require('./PowerupHandlers/FastShooting')
}];

function HandlePowerups() {
  alert('handle powerups is being updated');
  powerupList[0].func();
}