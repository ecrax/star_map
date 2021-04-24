import React, { useEffect } from "react";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_galaxy } from "./utils/create_galaxy";

function Galaxy(props) {
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

    create_galaxy(
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
