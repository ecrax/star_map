import React, { useEffect } from "react";
import * as THREE from "three";
import * as TWEEN from "tween";

import getRndInteger from "./utils/getRandInteger";
import fibonacci_sphere from "./utils/fibbonaciSphere";
import fermats_spiral from "./utils/fermats_spiral";
import goToPoint from "./utils/goToPoint";
import { onWindowResize } from "./utils/windowResize";
import { vec0 } from "./three.js/consts";
import {
  bg_color_material,
  planet_material_em,
  ring_material_em,
} from "./three.js/mats";
import TrackballControls from "three-trackballcontrols";
import { InteractionManager } from "three.interactive";
import { bg_color } from "./three.js/consts";

import { UnrealBloomPass } from "../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass";

//TMP
//import { BufferGeometryUtils } from "https://threejs.org/examples/jsm/utils/BufferGeometryUtils.js";

function App() {
  useEffect(() => {
    //scene, camera
    const scene = new THREE.Scene();
    //{
    //const color = 0x000000;
    //const near = 1;
    //const far = 100;
    //scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(bg_color);
    //}
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = Math.pow(1, 4.0);
    document.body.appendChild(renderer.domElement);

    //Glow
    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.25;
    bloomPass.strength = 3;
    bloomPass.radius = 1;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    //controls
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.75;
    controls.noPan = true;
    controls.minDistance = 2.275;
    const interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    //GEO and Lights
    create_planet(true, 2, 0.1, 1000, 0, 0, 0);
    //create_galaxy(true, 0, 0, 0, 0, 0, 0, 1, 1, 1);

    //lights
    const light = new THREE.PointLight(0xffffff, 5);
    light.position.y = 5;
    scene.add(light);

    //easy PRS changes
    camera.position.x = 15;
    camera.position.y = 15;
    camera.position.z = 15;

    //Animation
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
      interactionManager.update();

      composer.render();

      if (camera.position.equals(vec0)) {
        camera.position.x = 1;
        camera.position.y = 1;
        camera.position.z = 1;
      }

      TWEEN.update();
    }
    animate();

    window.addEventListener("resize",()=> onWindowResize(camera, renderer, composer));

    function create_planet(
      is_ring,
      _plan_mult,
      _plan_randMult,
      _fib_samp,
      param_x,
      param_y,
      param_z
    ) {
      const planet_sphere_geometry = new THREE.SphereGeometry();
      const ring_sphere_geometry = new THREE.SphereGeometry(1, 2, 2);
      //Wireframe sphere
      const wire_material = new THREE.MeshBasicMaterial({
        color: 0x595959,
        transparent: true,
        wireframe: true,
      });
      const wire_sphere_geo = new THREE.SphereGeometry(2, 16, 16);
      const wire_sphere = new THREE.Mesh(wire_sphere_geo, wire_material);
      //wire_sphere.on("click", function (ev) {});
      wire_sphere.position.x += param_x;
      wire_sphere.position.y += param_y;
      wire_sphere.position.z += param_z;
      scene.add(wire_sphere);
      //black inner sphere
      const black_sphere_geo = new THREE.SphereGeometry(2, 16, 16);
      const black_sphere = new THREE.Mesh(black_sphere_geo, bg_color_material);
      //black_sphere.on("click", function (ev) {});
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
        const sphere = new THREE.Mesh(
          planet_sphere_geometry,
          planet_material_em
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

        //sphere.cursor = "pointer";
        //sphere.on("pointermove", function (ev) {});
        //sphere.on("click", (ev) => goToPoint(ev, camera));

        sphere.addEventListener("click", (ev) => {
          goToPoint(ev, camera, 0.1, 0.25, 1000);
          console.log(ev);
        });
        sphere.addEventListener("mouseover", (ev) => {
          document.body.style.cursor = "pointer";
        });
        sphere.addEventListener("mouseout", (ev) => {
          document.body.style.cursor = "default";
        });

        scene.add(sphere);
        interactionManager.add(sphere);
        plan_sphere_array.push(sphere);
      }
      //ring points
      const ring_coords = fermats_spiral(3000, 1.45);
      const ring_sphere_array = [];
      const ring_mult = 2;
      const ring_randMult = 0.1;
      for (let i = 0; i < ring_coords.length; i++) {
        const sphere = new THREE.Mesh(ring_sphere_geometry, ring_material_em);

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
  }, []);

  return <div></div>;
}

export default App;
