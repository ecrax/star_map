import * as THREE from "three";

import { UnrealBloomPass } from "../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "../../node_modules/three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "../../node_modules/three/examples/jsm/postprocessing/RenderPass";

import TrackballControls from "three-trackballcontrols";
import { InteractionManager } from "three.interactive";

import { bg_color } from "../three.js/consts";

export function init() {
  //scene, camera
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg_color);

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
  bloomPass.strength = 5; //2;
  bloomPass.radius = 1;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  //controls
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.75;
  controls.noPan = true;
  controls.minDistance = 2.275;

  //interaction
  const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );
  return { scene, camera, renderer, composer, controls, interactionManager };
}
