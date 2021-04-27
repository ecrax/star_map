//imports
import { ResourceTracker } from "./ResourceTracker";

export function create_text(_text) {
  const resTracker = new ResourceTracker();
  const track = resTracker.track.bind(resTracker);

  const loader = track(new THREE.FontLoader());

  loader.load("../data/fonts", function (font) {
    const geometry = track(
      new THREE.TextGeometry(_text, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      })
    );
  });
}
