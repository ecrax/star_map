import React, { useEffect } from "react";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_galaxy } from "./utils/create_galaxy";
//import { load_obj } from "./utils/load_obj";

function Galaxy(props) {
  useEffect(() => {
    //init
    const {
      scene,
      camera,
      renderer,
      composer,
      controls,
      interactionManager,
    } = init(2.275, 75);

    //galaxy
    const { mesh, click_parent, resTracker } = create_galaxy(
      false,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      scene,
      camera,
      interactionManager,
      renderer,
      props
    );

    //custom obj
    //const obj = load_obj(scene, "./data/models/test.obj");

    //lights

    //easy PRS changes
    camera.position.x = 15;
    camera.position.y = 15;
    camera.position.z = 15;

    //Animation
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

      //Custom Animations
      mesh.rotation.y += 0.0001;
      click_parent.rotation.y += 0.0001;
    }
    animate();

    window.addEventListener("resize", () =>
      onWindowResize(camera, renderer, composer)
    );

    return () => {
      console.log("disposed galaxy");
      resTracker.dispose();
    };
  });

  return (
    <span
      style={{
        color: "white",
        position: "fixed",
        zIndex: 10,
        margin: 10,
        fontFamily: "monospace",
      }}
    >
      Shift + LeftClick
    </span>
  );
}

export default Galaxy;
