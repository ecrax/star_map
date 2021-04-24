export const cleanUpThree = () => {
  if (document.getElementsByTagName("canvas")[0]) {
    document.getElementsByTagName("canvas")[0].remove();
  }
};
