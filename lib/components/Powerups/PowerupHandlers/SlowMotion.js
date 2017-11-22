import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt) {}

export function handleSlowMo(dt, now, lastUpdate) {
  var isActive = powerupList[1].active;
  if (isActive === true) {
    return (now - lastUpdate) / 2;
  } else {
    return now - lastUpdate;
  }
}
