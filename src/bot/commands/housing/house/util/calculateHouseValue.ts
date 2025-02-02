import type { BasicHouseData } from "./types/houseType";

export const calculateHouseValue = (house: BasicHouseData) => {
  return Math.ceil(
    (house.location ** 1.5 *
      house.squareFootage *
      (house.quality + house.furniture)) /
      200,
  );
};
