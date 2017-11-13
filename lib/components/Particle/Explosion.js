import $ from 'jquery';
var frames = [
  require('./images/explosion/1.png'),
  require('./images/explosion/2.png'),
  require('./images/explosion/3.png'),
  require('./images/explosion/4.png'),
  require('./images/explosion/5.png')
];

// Adjustable variables
var framerate = 200; // How long is each animation frame?
var scaleRange = [1.35, 2]; // How big is the element?

class Explosion {
  play(x, y) {
    var frame = 0;
    var div = $(`<img src=${frames[0]} class="explosion" draggable="false" />`);
    var rotation = getRandom(0, 360);
    var scale = getRandom(scaleRange[0] * 100, scaleRange[1] * 100) / 100;
    div.css({
      left: x,
      top: y,
      transform: `translateX(-50%) translateY(-50%) rotate(${rotation}deg)`,
      scale: scale
    });
    $('.Game').append(div);
    var animation = setInterval(function() {
      frame += 1;
      div.attr('src', frames[frame]);
      if (frame >= frames.length - 1) {
        div.remove();
        clearInterval(animation);
      }
    }, framerate);
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export default new Explosion();
