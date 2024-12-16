import {
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	SlashCommandUserOption,
} from "discord.js";
import { eq, lt, sql } from "drizzle-orm";
import { db } from "../../db";
import { petsTable } from "../../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";

export const petstore: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("petstore")
		.setDescription("View the pet store"),
	handler: async (interaction) => {
		const results = await db
			.select({
				id: petsTable.id,
				petName: petsTable.petName,
				species: petsTable.species,
				age: petsTable.age,
				price: petsTable.price,
				isSold: petsTable.isSold,
			})
			.from(petsTable)
			.where(eq(petsTable.isSold, false))
			.limit(5)
			.orderBy(sql`RANDOM()`)
			.execute();
		const embed = new EmbedBuilder()
			.setTitle("Pet Store")
			.setColor(Color.GREEN)
			.setDescription("Here are the pets available for sale: \n")
			.addFields(
				results.map((result) => ({
					name: `${result.petName} :${result.species.toLowerCase()}:`,
					value: `ID: ${result.id}\nAge: ${result.age}\nPrice: ${result.price}\n`,
				})),
			);

		interaction.reply({
			embeds: [embed],
		});
	},
};
