import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt) {}

export function handleSlowMo(dt, now, lastUpdate) {
  var isActive = powerupList[1].active;
  if (isActive === true) {
    var newDt = (now - lastUpdate) / 2;
    return newDt;
  } else {
    return dt;
  }
}
