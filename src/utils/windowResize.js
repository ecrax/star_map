//Window Resize
export const onWindowResize = (camera, renderer, composer) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  composer.setSize(width, height);
};
