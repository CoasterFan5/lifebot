import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} from "discord.js";
import { and, count, eq, gte, isNull, lte } from "drizzle-orm";
import { db } from "../../../../db";
import { furnitureTable, housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { fullFurnitureValueRecalc } from "./util/fullFurnitureRecalc";
import { noHouseFoundEmbed } from "./util/noHouseEmbed";

export const bulkFurnish: LifebotCommandHandler = async ({
	user,
	interaction,
}) => {
	const houseId = interaction.options.getInteger("house", true);
	const startId = interaction.options.getInteger("start", true);
	const endId = interaction.options.getInteger("end", true);

	const houseList = await db
		.select()
		.from(housesTable)
		.where(
			and(eq(housesTable.ownerId, user.userId), eq(housesTable.id, houseId)),
		);

	if (houseList.length < 1) {
		return interaction.reply({
			embeds: [noHouseFoundEmbed],
		});
	}

	const house = houseList[0];

	const whereCondition = and(
		eq(furnitureTable.ownerId, user.userId),
		isNull(furnitureTable.houseId),
		lte(furnitureTable.id, endId),
		gte(furnitureTable.id, startId),
	);

	const furnitureItems = await db
		.select({
			count: count(),
		})
		.from(furnitureTable)
		.where(whereCondition);

	const itemCount = furnitureItems[0].count;

	const confirmEmbed = new EmbedBuilder()
		.setTitle("Are you sure?")
		.setDescription(
			`This will assign ${itemCount} furniture items to house with id \`${houseId}\`.`,
		)
		.setColor(Color.BLUE)
		.setFooter({
			text: "Expires in 60 seconds.",
		});

	const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setLabel("Confirm")
			.setCustomId("c")
			.setStyle(ButtonStyle.Danger),
	);

	const reply = await interaction.reply({
		embeds: [confirmEmbed],
		components: [buttons],
	});

	reply
		.awaitMessageComponent({
			time: 60_000,
			filter: (i) => i.user.id === user.userId,
		})
		.then(async (newI) => {
			try {
				const assignedItems = await db
					.update(furnitureTable)
					.set({
						houseId: house.id,
					})
					.where(whereCondition)
					.returning();

				const itemsNames = assignedItems
					.map((item) => `${item.material} ${item.type}`)
					.join("\n");

				const newScore = await fullFurnitureValueRecalc(house.id);

				const updatedEmbed = new EmbedBuilder()
					.setColor(Color.BLUE)
					.setTitle("House furnished!")
					.setDescription(`New furniture score: ${newScore.toFixed(2)}/100`)
					.addFields({
						name: "Added the following items: ",
						value: itemsNames,
					});

				await newI.reply({
					embeds: [updatedEmbed],
				});
			} catch (e) {
				console.warn(e);
				newI.reply("Something went wrong...");
			}
		})
		.catch((e) => {
			reply.edit({
				embeds: [confirmEmbed.setTitle("Expired").setColor(Color.RED)],
				components: [],
			});
		});
};
