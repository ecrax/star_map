import { NameGenerator } from "./NameGenerator";

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
export const getPlanet = () => {
  const getName = NameGenerator(Math.floor(Math.random() * 10000));
  return getName();
};
export const uuid = () =>
  `${s4() + s4()}-${getPlanet().toLowerCase().replaceAll(" ", "")}-${
    s4() + s4()
  }`;
export const uuidFromPlanetName = (planet) =>
  `${s4() + s4()}-${planet.toLowerCase().replaceAll(" ", "")}-${s4() + s4()}`;
