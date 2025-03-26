import { EmbedBuilder } from "discord.js";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { increment } from "../../../../db/increment";
import { furnitureTable, housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import {
	type FurnitureItem,
	calculateFurnitureScore,
} from "../furniture/furnitureCalculations";
import { fullFurnitureValueRecalc } from "./util/fullFurnitureRecalc";

const noHouseEmbed = new EmbedBuilder()
	.setTitle("No house")
	.setDescription(
		"You don't own a house with that id. Try /house info to view all homes.",
	)
	.setColor(Color.BLUE);

const noFurnitureEmbed = new EmbedBuilder()
	.setTitle("No furniture")
	.setDescription(
		"You don't own a piece of furniture with that id. Try /furniture info to view all homes.",
	)
	.setColor(Color.BLUE);

const furnitureAlreadyAssignedEmbed = new EmbedBuilder()
	.setTitle("Uh oh!")
	.setDescription("This piece of furniture is already in a house.")
	.setColor(Color.BLUE);

export const furnish: LifebotCommandHandler = async ({ interaction, user }) => {
	const houseId = interaction.options.getInteger("house", true);
	const furnitureId = interaction.options.getInteger("furniture", true);

	const houseListPromise = db
		.select()
		.from(housesTable)
		.where(
			and(eq(housesTable.id, houseId), eq(housesTable.ownerId, user.userId)),
		);

	const furnitureListPromise = db
		.select()
		.from(furnitureTable)
		.where(
			and(
				eq(furnitureTable.id, furnitureId),
				eq(furnitureTable.ownerId, user.userId),
			),
		);

	const houseList = await houseListPromise;
	const furnitureList = await furnitureListPromise;

	if (houseList.length < 1) {
		interaction.reply({
			embeds: [noHouseEmbed],
		});
		return;
	}

	if (furnitureList.length < 1) {
		interaction.reply({
			embeds: [noFurnitureEmbed],
		});
		return;
	}

	const house = houseList[0];
	const furnitureItem = furnitureList[0];

	if (furnitureItem.houseId != null) {
		interaction.reply({
			embeds: [furnitureAlreadyAssignedEmbed],
		});
		return;
	}

	// We have done all the checks, now we can update. Finally.

	await db
		.update(furnitureTable)
		.set({
			houseId: house.id,
		})
		.where(eq(furnitureTable.id, furnitureItem.id));

	// now we can change the house furniture score

	const newScore = await fullFurnitureValueRecalc(house.id);

	const successEmbed = new EmbedBuilder()
		.setTitle("Furniture Assigned")
		.setDescription(
			`You have added one ${furnitureItem.material} ${furnitureItem.type} to house ${houseId}\nNew furniture score: ${newScore.toFixed(2)}/100`,
		)
		.setColor(Color.BLUE);

	interaction.reply({
		embeds: [successEmbed],
	});
};
