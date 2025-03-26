import { eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { furnitureTable, housesTable } from "../../../../../db/schema";
import {
	calculateFurnitureScore,
	type FurnitureItem,
} from "../../furniture/furnitureCalculations";

export const fullFurnitureValueRecalc = async (houseId: number) => {
	const allFurniture = await db
		.select()
		.from(furnitureTable)
		.where(eq(furnitureTable.houseId, houseId));
	let score = 0;
	for (const item of allFurniture) {
		score += calculateFurnitureScore(item as FurnitureItem);
	}

	score = Math.min(100, score);

	await db
		.update(housesTable)
		.set({
			furnitureScore: score,
		})
		.where(eq(housesTable.id, houseId));

	return score;
};
