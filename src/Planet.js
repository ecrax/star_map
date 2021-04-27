import React, { useEffect } from "react";

import { onWindowResize } from "./utils/windowResize";
import { animate_utils } from "./utils/animate_utils";

import { init } from "./utils/init_utils";

import { create_planet } from "./utils/create_planet";
import { getPlanet, uuidFromPlanetName } from "./utils/planetNames";

function Planet() {
  useEffect(() => {
    const {
      scene,
      camera,
      renderer,
      composer,
      controls,
      interactionManager,
    } = init(2.275, 25);

    //GEO and Lights

    const { resTracker } = create_planet(
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
      console.log("planet disposed");
      resTracker.dispose();
    };
  }, []);

  const planetName = getPlanet();
  const uuid = uuidFromPlanetName(planetName);

  return (
    <div
      style={{
        color: "white",
        position: "fixed",
        zIndex: 10,
        margin: 10,
        fontFamily: "monospace",
      }}
    >
      <span>{planetName}</span>
      <br />
      <span>{uuid}</span>
      <br />
      {/*<span>{uuid()}</span>*/}
    </div>
  );
}

export default Planet;
