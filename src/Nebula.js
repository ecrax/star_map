import React, { useEffect } from "react";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_nebula } from "./utils/create_nebula";

const Nebula = (props) => {
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

    return () => {
      console.log("nebula disposed");
      resTracker.dispose();
    };
  });

  return <div></div>;
};

export default Nebula;
