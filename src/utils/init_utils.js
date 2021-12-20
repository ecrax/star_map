import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  ReinhardToneMapping,
  Vector2,
} from "three";

import { UnrealBloomPass } from "../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "../../node_modules/three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "../../node_modules/three/examples/jsm/postprocessing/RenderPass";
//import { LUTPass } from "../../node_modules/three/examples/jsm/postprocessing/LUTPass.js";
//import { LUTCubeLoader } from "../../node_modules/three/examples/jsm/loaders/LUTCubeLoader.js";

import TrackballControls from "three-trackballcontrols";
import { InteractionManager } from "three.interactive";

import { bg_color } from "../three.js/consts";

export function init(_minDistance, _maxDistance) {
  //scene, camera
  const scene = new Scene();
  scene.background = new Color(bg_color);

  const camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //render
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = ReinhardToneMapping;
  //renderer.toneMapping =  ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  document.body.appendChild(renderer.domElement);

  //Glow
  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = 0.25;
  bloomPass.strength = 5; //3;
  bloomPass.radius = 1;

  // Lut
  //const lutPass = new LUTPass();
  //console.log(new LUTCubeLoader().load("path"));

  //composer
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  //composer.addPass(lutPass);

  //controls
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.75;
  controls.noPan = true;
  controls.minDistance = _minDistance;
  controls.maxDistance = _maxDistance;

  //interaction
  const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );
  return { scene, camera, renderer, composer, controls, interactionManager };
}
