'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateNotification;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CreateNotification(name) {
  var note = (0, _jquery2.default)('<div class="notification">' + name + '</div>');
  note.css(styles);
}