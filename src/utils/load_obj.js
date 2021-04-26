//imports
import { OBJLoader } from "../../node_modules/three/examples/jsm/loaders/OBJLoader";
import { ResourceTracker } from "./ResourceTracker";

export function load_obj(scene, _path, _mat) {
  const resTracker = new ResourceTracker();
  const track = resTracker.track.bind(resTracker);
  const loader = track(new OBJLoader());
  loader.load(_path, function (object) {
    object.material = _mat;
    scene.add(object);
    console.log(object);
  });
}
