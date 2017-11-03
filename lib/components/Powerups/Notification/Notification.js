import $ from 'jquery';

export default function CreateNotification(name) {
  var note = $(`<div class="notification">${name}</div>`);
  note.css(styles);
}
