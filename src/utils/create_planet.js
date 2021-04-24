//imports
import * as THREE from "three";
import getRndInteger from "./getRandInteger";
import fibonacci_sphere from "./fibbonaciSphere";
import fermats_spiral from "./fermats_spiral";
import goToPoint from "./goToPoint";
import {
  bg_color_material,
  planet_material_em,
  ring_material_em,
} from "../three.js/mats";
import { ResourceTracker } from "./ResourceTracker";

//Create A Planet
export function create_planet(
  is_ring,
  _plan_mult,
  _plan_randMult,
  _fib_samp,
  param_x,
  param_y,
  param_z,
  scene,
  camera,
  interactionManager
) {
  const resTracker = new ResourceTracker();
  const track = resTracker.track.bind(resTracker);

  const planet_sphere_geometry = track(new THREE.SphereGeometry());
  const ring_sphere_geometry = track(new THREE.SphereGeometry(1, 2, 2));
  //Wireframe sphere
  const wire_material = track(
    new THREE.MeshBasicMaterial({
      color: 0x595959,
      transparent: true,
      wireframe: true,
    })
  );
  const wire_sphere_geo = track(new THREE.SphereGeometry(2, 16, 16));
  const wire_sphere = track(new THREE.Mesh(wire_sphere_geo, wire_material));
  wire_sphere.position.x += param_x;
  wire_sphere.position.y += param_y;
  wire_sphere.position.z += param_z;
  scene.add(wire_sphere);
  //black inner sphere
  const black_sphere_geo = track(new THREE.SphereGeometry(2, 16, 16));
  const black_sphere = track(
    new THREE.Mesh(black_sphere_geo, bg_color_material)
  );
  black_sphere.position.x += param_x;
  black_sphere.position.y += param_y;
  black_sphere.position.z += param_z;
  scene.add(black_sphere);

  //planet points
  const plan_coords = fibonacci_sphere(_fib_samp);
  const plan_sphere_array = [];
  const plan_mult = _plan_mult;
  const plan_randMult = _plan_randMult;
  for (let i = 0; i < plan_coords.length; i++) {
    const sphere = track(
      new THREE.Mesh(planet_sphere_geometry, planet_material_em)
    );

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

    sphere.addEventListener("click", (ev) =>
      goToPoint(ev, camera, 0.25, 0.01, 1000)
    );
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

  //ring points
  if (is_ring) {
    const ring_coords = fermats_spiral(3000, 1.45);
    const ring_sphere_array = [];
    const ring_mult = 2;
    const ring_randMult = 0.1;
    for (let i = 0; i < ring_coords.length; i++) {
      const sphere = track(
        new THREE.Mesh(ring_sphere_geometry, ring_material_em)
      );

      const x = ring_coords[i][0] * ring_mult;
      const z = ring_coords[i][1] * ring_mult;

      const vec = [
        x * (1 + Math.random() * ring_randMult),
        (Math.random() - 0.5) * 0.5,
        z * (1 + Math.random() * ring_randMult),
      ];

      sphere.position.x = vec[0] + param_x;
      sphere.position.y = vec[1] + param_y;
      sphere.position.z = vec[2] + param_z;

      const scale = getRndInteger(1, 3) / 200;

      sphere.scale.x = scale;
      sphere.scale.y = scale;
      sphere.scale.z = scale;

      scene.add(sphere);
      ring_sphere_array.push(sphere);
    }
  }

  return { resTracker };
}
