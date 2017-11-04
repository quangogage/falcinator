import $ from 'jquery';

var catchphrases = [
  'MAIL in comparison!',
  'MAIL dominance!',
  'MAIL, man',
  'SNAIL MAIL!'
];

var styles = {
  position: 'absolute',
  top: 0,
  left: 0
};
export default function CreateNotification() {
  var phrase = catchphrases[0];
  var note = $(`<div class="notification">${phrase}</div>`);
  note.css(styles);
}
