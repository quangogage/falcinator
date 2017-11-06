import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt) {}

export function handleSlowMo(dt, now, lastUpdate) {
  var isActive = powerupList[1].active;
  console.log(powerupList[1].timer);
  if (isActive === true) {
    var newDt = (now - lastUpdate) / 2;
    return newDt;
  } else {
    return now - lastUpdate;
  }
}
