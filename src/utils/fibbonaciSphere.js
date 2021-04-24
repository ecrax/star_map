//Dist Points on Sphere
const fibonacci_sphere = (_samples) => {
  const points = [];
  const phi = Math.PI * (3.0 - Math.sqrt(5.0));

  for (let i = 0; i < _samples; i++) {
    const y = 1 - (i / parseFloat(_samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);

    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    points.push([x, y, z]);
  }
  return points;
};

export default fibonacci_sphere;
