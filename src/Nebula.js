import React, { useEffect } from "react";
import * as THREE from "three";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_nebula } from "./utils/create_nebula";
import { load_obj } from "./utils/load_obj";

const Nebula = (props) => {
  useEffect(() => {
    const {
      scene,
      camera,
      renderer,
      composer,
      controls,
      interactionManager,
    } = init(0.1, 15);

    //Nebula
    const { resTracker } = create_nebula(
      2,
      10,
      3000,
      0,
      0,
      0,
      scene,
      camera,
      interactionManager,
      renderer,
      props
    );

    //custom obj

    const obj = load_obj(
      scene,
      "./data/models/test.obj",
      new THREE.MeshStandardMaterial({ emissive: 0xffffff })
    );

    //lights

    //easy PRS changes
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      animate_utils(
        scene,
        camera,
        interactionManager,
        renderer,
        controls,
        composer
      );
    }
    animate();

    window.addEventListener("resize", () =>
      onWindowResize(camera, renderer, composer)
    );

    return () => {
      console.log("nebula disposed");
      resTracker.dispose();
    };
  });

  return <div></div>;
};

export default Nebula;
