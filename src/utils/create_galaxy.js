//imports
import * as THREE from "three";
import * as TWEEN from "tween";

import getRndInteger from "./getRandInteger";
import fermats_spiral from "./fermats_spiral";
import goToPoint from "./goToPoint";

import Galaxy from "../data/galaxy/galaxy.json";

import { BufferGeometryUtils } from "../../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js";

//galaxy
export function create_galaxy(
  _bw,
  _x,
  _y,
  _z,
  _rx,
  _ry,
  _rz,
  _sx,
  _sy,
  _sz,
  scene,
  camera,
  interactionManager,
  renderer,
  props
) {
  const points = Galaxy[0]["points"];
  const temp = Galaxy[0]["temp"];
  const size = Galaxy[0]["size"];
  const bright = Galaxy[0]["bright"];

  const color = new THREE.Color(0x595959);

  const gal_sphere_array = [];

  const geometries = [];

  const positionHelper = new THREE.Object3D();

  const originHelper = new THREE.Object3D();
  originHelper.position.z = 0.5;
  positionHelper.add(originHelper);

  for (let i = 0; i < points.length; i++) {
    const sphere_geometry = new THREE.SphereGeometry(1, 1, 1);
    const x = points[i][0] / 1000;
    const y = (temp[i] / 3000) * (Math.random() * 0.2) + size[i] / 150;
    const z = points[i][1] / 1000;

    const scale = getRndInteger(2, 6) * 0.005;

    positionHelper.position.set(x, y, z);
    positionHelper.scale.set(scale, scale, scale);
    originHelper.updateWorldMatrix(true, false);
    sphere_geometry.applyMatrix4(originHelper.matrixWorld);

    //set color

    const colors = [];
    /*
    const b = bright[i] + 0.25;
    for (let j = 0; j < 12; j++) {
      colors.push(b, b, b);
    }
    */
    if (size[i] <= 1.0) {
      for (let i = 0; i < 12; i++) {
        if (!_bw) {
          colors.push(0.25, 0.25, 0.25);
        } else {
          colors.push(248 / 255, 103 / 255, 212 / 255);
        }
      }
    } else if (size[i] <= 2.5) {
      for (let i = 0; i < 12; i++) {
        if (!_bw) {
          colors.push(0.5, 0.5, 0.5);
        } else {
          colors.push(81 / 255, 121 / 255, 248 / 255);
        }
      }
    } else if (size[i] <= 5.0) {
      for (let i = 0; i < 12; i++) {
        if (!_bw) {
          colors.push(0.75, 0.75, 0.75);
        } else {
          colors.push(207 / 255, 157 / 255, 247 / 255);
        }
      }
    } else {
      for (let i = 0; i < 12; i++) {
        if (!_bw) {
          colors.push(1, 1, 1);
        } else {
          colors.push(53 / 255, 248 / 255, 244 / 255);
        }
      }
    }

    sphere_geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );

    //add to geo
    geometries.push(sphere_geometry);
  }
  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
  });

  const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
    geometries,
    false
  );
  const mesh = new THREE.Mesh(mergedGeometry, material);
  //apply pos, rot, scale
  mesh.position.x += _x;
  mesh.position.y += _y;
  mesh.position.z += _z;

  mesh.rotation.x += _rx;
  mesh.rotation.y += _ry;
  mesh.rotation.z += _rz;

  mesh.scale.x += _sx;
  mesh.scale.y += _sy;
  mesh.scale.z += _sz;

  mesh.doubleSided = false;
  scene.add(mesh);

  const parent_sphere_geo = new THREE.SphereGeometry(0, 1, 1);
  const click_parent = new THREE.Mesh(
    parent_sphere_geo,
    new THREE.MeshBasicMaterial({ opacity: 0 })
  );
  scene.add(click_parent);

  function create_click_sphere(_x, _y, _z) {
    const points = fermats_spiral(75, 0.2);
    const sphere_geo = new THREE.SphereGeometry(1, 1, 1);
    const click_sphere_array = [];
    for (let i = 0; i < points.length; i++) {
      const click_sphere_wire_material = new THREE.MeshBasicMaterial({
        color: 0x595959,
        transparent: true,
        opacity: 0,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(sphere_geo, click_sphere_wire_material);

      const x = points[i][0] * 40;
      const z = points[i][1] * 40;

      const vec = [
        x * (1 + Math.random() * 1),
        (Math.random() - 0.5) * 0.5,
        z * (1 + Math.random() * 1),
      ];

      sphere.position.x = vec[0] + _x;
      sphere.position.y = vec[1] + _y;
      sphere.position.z = vec[2] + _z;

      const scale = 4;

      sphere.scale.x = scale;
      sphere.scale.y = scale;
      sphere.scale.z = scale;

      sphere.addEventListener("mouseover", (ev) => {
        document.body.style.cursor = "pointer";
      });
      sphere.addEventListener("mouseout", (ev) => {
        document.body.style.cursor = "default";
      });
      sphere.addEventListener("click", (ev) => {
        if (ev.originalEvent.shiftKey) {
          const time = 2500;
          goToPoint(ev, camera, 10, 0.25, time);
          ev.target.material.opacity = 1;

          const from = { o: 1.0 };

          new TWEEN.Tween(from)
            .to({ o: 0.0 }, time)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              renderer.toneMappingExposure = from.o;
              if (from.o === 0.0) {
                //toLink("https://jonathan-kron.com/starmap/");
                props.history.push("/planet");
              }
            })
            .start();
        }
      });
      interactionManager.add(sphere);

      click_parent.add(sphere);
      click_sphere_array.push(sphere);
    }
  }
  create_click_sphere(_x, _y, _z);
  return { mesh, click_parent };
}
