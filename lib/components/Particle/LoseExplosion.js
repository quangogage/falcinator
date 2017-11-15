import $ from 'jquery';

var frames = [
  require('./images/lose explosion/1.png'),
  require('./images/lose explosion/2.png'),
  require('./images/lose explosion/3.png'),
  require('./images/lose explosion/4.png'),
  require('./images/lose explosion/5.png'),
  require('./images/lose explosion/6.png'),
  require('./images/lose explosion/7.png'),
  require('./images/lose explosion/8.png'),
  require('./images/lose explosion/9.png'),
  require('./images/lose explosion/10.png'),
  require('./images/lose explosion/11.png'),
  require('./images/lose explosion/12.png')
];
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated'
};
var framerate = 75;
var animTimer = 0;
var frame = 0;
var scale = 1;
var el;

export function TriggerLoseExplosion(x, y) {
  el = $(`<img src=${frames[0]} class="lose-explosion" />`);
  el.css(styles);
  el.css({
    left: x,
    top: y,
    transform: `translateX(-50%) translateY(-50%) scale(${scale})`
  });
}
export function UpdateLoseExplosion(dt) {
  animTimer += dt;
  if (animTimer >= framerate) {
    if (frame !== frames.length - 1) {
      frame += 1;
    }
    el.attr('src', frames[frame]);
    if (frame === frames.length - 1) {
      el.remove();
    }
    animTimer = 0;
  }
}
