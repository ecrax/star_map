//imports
import { OBJLoader } from "../../node_modules/three/examples/jsm/loaders/OBJLoader";
import { ResourceTracker } from "./ResourceTracker";

export function load_obj(scene, _path) {
  const resTracker = new ResourceTracker();
  const track = resTracker.track.bind(resTracker);
  const loader = track(new OBJLoader());
  loader.load(
    // resource URL
    _path,
    // called when resource is loaded
    function (object) {
      scene.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}
