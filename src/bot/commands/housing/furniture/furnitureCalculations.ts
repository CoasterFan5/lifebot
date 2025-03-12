import { type Material, getMaterialScore } from "./materialList";

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
    Math.floor(
      100 *
        (9 * (item.condition / 100) * (getMaterialScore(item.material) / 8) +
          antiqueValue),
    ) / 100
  );
};

export const calculateFurniturePrice = (
  score: number,
  originalValue: number,
) => {
  return Math.floor(100 * (score * originalValue)) / 100;
};
