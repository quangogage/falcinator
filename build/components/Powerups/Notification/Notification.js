'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateNotification;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var catchphrases = ['MAIL in comparison!', 'MAIL dominance!', 'MAIL, man', 'SNAIL MAIL!'];

var styles = {
  position: 'absolute',
  top: 0,
  left: 0
};
function CreateNotification() {
  var phrase = catchphrases[0];
  var note = (0, _jquery2.default)('<div class="notification">' + phrase + '</div>');
  note.css(styles);
}