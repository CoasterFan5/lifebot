import { calculateHouseValue } from "./calculateHouseValue";
import type { BasicHouseData } from "./types/houseType";

const randomSquareFootage: () => number = () => {
	const rand = Math.random();
	// 1000 - 3000 80% chance
	if (rand <= 0.8) {
		return Math.floor(Math.random() * 2000 + 1000);
	}

	// 3000 - 5,000 15% chance
	if (rand <= 0.95) {
		return Math.floor(Math.random() * 2000 + 3000);
	}

	// 5,000 - 10,000 3% chance
	if (rand <= 0.99) {
		return Math.floor(Math.random() * 5000 + 5000);
	}

	//10,000 - 100,000 1%< chance
	return Math.floor(Math.random() * 90_000 + 10_000);
};

export const generateHouse = () => {
	const houseData: BasicHouseData = {
		location: Math.floor(Math.random() * 101),
		squareFootage: randomSquareFootage(),
		quality: Math.floor(Math.random() * 101),
		furnitureScore: 0,
	};

	/*
    Ignore quality to prevent buying a house, renovating, and instantly selling for profit.
  */

	return {
		...houseData,
		value: calculateHouseValue(houseData, {
			ignoreQuality: true,
		}),
	};
};
