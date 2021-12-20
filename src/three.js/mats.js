import { MeshStandardMaterial, MeshBasicMaterial } from "three";
import { bg_color } from "./consts";

//mats
export const planet_material_em = new MeshStandardMaterial({
  emissive: 0xffffff,
  transparent: true,
});
export const galaxy_material_em = new MeshStandardMaterial({
  emissive: 0xffffff,
});
export const ring_material_em = new MeshStandardMaterial({
  emissive: 0x8a8a8a,
  transparent: true,
});
export const darker_1_material_em = new MeshStandardMaterial({
  emissive: 0x7d7d7d,
  transparent: true,
});
export const darker_2_material_em = new MeshStandardMaterial({
  emissive: 0x5c5c5c,
  transparent: true,
});
export const bg_color_material = new MeshBasicMaterial({
  color: bg_color,
});
