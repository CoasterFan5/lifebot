import type { BasicHouseData } from "./types/houseType";

export const calculateHouseValue = (
  house: BasicHouseData,
  options?: {
    ignoreQuality?: boolean;
  },
) => {
  const qualityFactor = options?.ignoreQuality ? 100 : house.quality;

  return Math.ceil(
    (house.location ** 1.5 *
      house.squareFootage *
      (qualityFactor + house.furniture)) /
      200,
  );
};
