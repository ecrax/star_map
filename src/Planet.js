import React, { useEffect } from "react";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_planet } from "./utils/create_planet";

function Planet() {
  useEffect(() => {
    const {
      scene,
      camera,
      renderer,
      composer,
      controls,
      interactionManager,
    } = init();

    //GEO and Lights

    create_planet(
      true,
      2,
      0.1,
      1000,
      0,
      0,
      0,
      scene,
      camera,
      interactionManager
    );

    //lights

    //easy PRS changes
    camera.position.x = 15;
    camera.position.y = 15;
    camera.position.z = 15;

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
  }, []);

  return <div></div>;
}

export default Planet;
