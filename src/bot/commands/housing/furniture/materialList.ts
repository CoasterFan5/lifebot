export type Material =
  | "Plastic"
  | "Stone"
  | "Plywood"
  | "Pinewood"
  | "Steel"
  | "Oak"
  | "Leather"
  | "Teakwood";

export const materials: Material[] = [
  "Plastic",
  "Stone",
  "Plywood",
  "Pinewood",
  "Steel",
  "Oak",
  "Leather",
  "Teakwood",
];

// Material score mapping - higher scores indicate better quality/more valuable materials
const matMap: Record<Material, number> = {
  Plastic: 1,
  Stone: 2,
  Plywood: 3,
  Pinewood: 4,
  Steel: 5,
  Oak: 6,
  Leather: 7,
  Teakwood: 8,
};

export const getMaterialScore = (material: Material) => {
  if (!matMap[material]) {
    console.error(`Invalid material ${material}`);
    return 4; // return an average if we cant find a material
  }
  return matMap[material];
};
