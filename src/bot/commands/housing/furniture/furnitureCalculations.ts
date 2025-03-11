import { getMaterialScore, type Material } from "./materialList";

export type FurnitureItem = {
  originalValue: number;
  type: string;
  condition: number;
  material: Material;
  antique: boolean;
  age: number;
};

export const calculateFurnitureScore = (item: FurnitureItem) => {
  const antiqueValue = item.antique ? 1 : 0;

  return (
    9 * (item.condition / 100) * (getMaterialScore(item.material) / 8) +
    antiqueValue
  );
};

export const calculateFurniturePrice = (
  score: number,
  originalValue: number,
) => {
  return score * originalValue;
};
