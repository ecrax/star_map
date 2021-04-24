import * as THREE from "three";
import * as TWEEN from "tween";

export function animate_utils(
  scene,
  camera,
  interactionManager,
  renderer,
  controls,
  composer,
  objArray
) {
  renderer.render(scene, camera);
  controls.update();

  composer.render();

  if (camera.position.equals(new THREE.Vector3(0, 0, 0))) {
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 1;
  }

  TWEEN.update();

  interactionManager.update();
}