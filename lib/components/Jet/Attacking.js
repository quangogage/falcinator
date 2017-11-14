import { quails } from '../Quail/Quail';

export default function UpdateAttacking(v, dt) {
  var targetQuail = quails[quails.length - 1];
  v.target.x = targetQuail.x + targetQuail.el.width() / 2;
  v.target.y = targetQuail.y + targetQuail.el.height() / 2;
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
