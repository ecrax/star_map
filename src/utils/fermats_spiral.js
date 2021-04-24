//Fermat's Spiral
const fermats_spiral = (_num, _minLenToZero) => {
  const points = [];
  const scaleFactor = 0.05;
  for (let i = 0; i < _num; i++) {
    const theta = 2.39998131 * i;
    const radius = scaleFactor * Math.sqrt(theta);
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    if (Math.pow(x, 2) + Math.pow(z, 2) > Math.pow(_minLenToZero, 2)) {
      points.push([x, z]);
    }
  }
  return points;
};

export default fermats_spiral;
