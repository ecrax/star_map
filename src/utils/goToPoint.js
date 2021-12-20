import { Vector3 } from "three";
import * as TWEEN from "tween";

//click to zoom in
const goToPoint = (ev, camera, _dis, _step, _time) => {
  const posToAnimateTo = ev.target.position;
  const coords = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };

  let count = 0;

  new TWEEN.Tween(coords)
    .to(
      {
        x: posToAnimateTo.x,
        y: posToAnimateTo.y,
        z: posToAnimateTo.z,
      },
      _time
    )
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      camera.position.set(coords.x, coords.y, coords.z);
      if (count < _dis) {
        count += _step;
      }
      camera.translateOnAxis(new Vector3(0, 0, 1), count);
    })
    .start();
};

export default goToPoint;
