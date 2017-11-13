import $ from 'jquery';
var frames = [
  require('./images/explosion/1.png'),
  require('./images/explosion/2.png'),
  require('./images/explosion/3.png'),
  require('./images/explosion/4.png'),
  require('./images/explosion/5.png')
];

var framerate = 75;
class Explosion {
  play(x, y) {
    var frame = 0;
    var turned = false;
    var div = $(`<img src=${frames[0]} class="explosion" draggable="false" />`);
    div.css({
      left: x,
      top: y,
      transform: 'translateX(-50%) translateY(-50%)'
    });
    $('.Game').append(div);
    var animation = setInterval(function() {
      if (turned === false) {
        if (frame === frames.length - 1) {
          turned = true;
        } else {
          frame += 1;
        }
      } else {
        if (frame !== 0) {
          frame -= 1;
        } else {
          div.attr('src', frames[frame]);
          if (frame >= frames.length - 1) {
            div.remove();
            clearInterval(animation);
          }
        }
      }
    }, framerate);
  }
}
export default new Explosion();
