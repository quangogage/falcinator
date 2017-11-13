import $ from 'jquery';
var frames = [
  require('./images/explosion/1.png'),
  require('./images/explosion/2.png'),
  require('./images/explosion/3.png'),
  require('./images/explosion/4.png'),
  require('./images/explosion/5.png'),
  require('./images/explosion/6.png'),
  require('./images/explosion/7.png')
];

// Adjustable variables
var framerate = 67.666; // How long is each animation frame?
var scaleRange = [0.5, 0.5]; // How big is the element?

class Explosion {
  play(x, y, angle) {
    var frame = 0;
    var div = $(`<img src=${frames[0]} class="explosion" draggable="false" />`);
    var scale = getRandom(scaleRange[0] * 100, scaleRange[1] * 100) / 100;
    div.css({
      left: x,
      top: y,
      transform: `translateX(-50%) translateY(-50%) rotate(${angle +
        Math.PI / 2}rad)`,
      scale: scale,
      imageRendering: 'pixelated'
    });
    $('.Game').append(div);
    var animation = setInterval(function() {
      if (frame !== frames.length - 1) {
        frame += 1;
        div.attr('src', frames[frame]);
      } else {
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
