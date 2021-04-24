//imports
import * as THREE from "three";
import * as TWEEN from "tween";

import getRndInteger from "./getRandInteger";
import fibonacci_sphere from "./fibbonaciSphere";
import goToPoint from "./goToPoint";
import { cleanUpThree } from "./cleanUpThree";
import { planet_material_em } from "../three.js/mats";

//Create A Planet
export function create_nebula(
  _plan_mult,
  _plan_randMult,
  _fib_samp,
  param_x,
  param_y,
  param_z,
  scene,
  camera,
  interactionManager,
  renderer,
  props
) {
  const planet_sphere_geometry = new THREE.SphereGeometry();

  //planet points
  const plan_coords = fibonacci_sphere(_fib_samp);
  const plan_sphere_array = [];
  const plan_mult = _plan_mult;
  const plan_randMult = _plan_randMult;
  for (let i = 0; i < plan_coords.length; i++) {
    const sphere = new THREE.Mesh(planet_sphere_geometry, planet_material_em);

    const x = plan_coords[i][0] * plan_mult;
    const y = plan_coords[i][1] * plan_mult;
    const z = plan_coords[i][2] * plan_mult;

    const vec = [
      x * (1 + Math.random() * plan_randMult),
      y * (1 + Math.random() * plan_randMult),
      z * (1 + Math.random() * plan_randMult),
    ];

    sphere.position.x = vec[0] + param_x;
    sphere.position.y = vec[1] + param_y;
    sphere.position.z = vec[2] + param_z;

    const scale = getRndInteger(1, 3) / 100;

    sphere.scale.x = scale;
    sphere.scale.y = scale;
    sphere.scale.z = scale;

    sphere.addEventListener("click", (ev) => {
      const time = 1000;
      goToPoint(ev, camera, 0.25, 0.01, time);

      const from = { o: 1.0 };

      new TWEEN.Tween(from)
        .to({ o: 0.0 }, time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          renderer.toneMappingExposure = from.o;
          if (from.o === 0.0) {
            //toLink("https://jonathan-kron.com/starmap/");
            cleanUpThree();
            props.history.push("/planet");
          }
        })
        .start();
    });
    sphere.addEventListener("mouseover", (ev) => {
      document.body.style.cursor = "pointer";
    });
    sphere.addEventListener("mouseout", (ev) => {
      document.body.style.cursor = "default";
    });
    interactionManager.add(sphere);

    scene.add(sphere);
    plan_sphere_array.push(sphere);
  }
}
