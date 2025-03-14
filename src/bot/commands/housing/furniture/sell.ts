import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentBuilder,
	EmbedBuilder,
} from "discord.js";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { increment } from "../../../../db/increment";
import { furnitureTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import {
	type FurnitureItem,
	calculateFurniturePrice,
	calculateFurnitureScore,
} from "./furnitureCalculations";
import { noFurnitureEmbed } from "./utils";

export const sell: LifebotCommandHandler = async ({ interaction, user }) => {
	const itemId = interaction.options.getInteger("id", true);

	const furnitureItem = await db
		.select()
		.from(furnitureTable)
		.where(
			and(
				eq(furnitureTable.id, itemId),
				eq(furnitureTable.ownerId, user.userId),
			),
		);

	if (furnitureItem.length !== 1) {
		interaction.reply({
			embeds: [noFurnitureEmbed],
		});
		return;
	}

	const realFurnitureItem = furnitureItem[0];

	if (realFurnitureItem.houseId) {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle("This is in use")
					.setDescription("This furniture item is in use...")
					.setColor(Color.RED),
			],
		});
		return;
	}

	const sellValue = Math.floor(
		calculateFurniturePrice(
			calculateFurnitureScore(realFurnitureItem as FurnitureItem),
			realFurnitureItem.originalValue,
		),
	);

	const sellConfirmEmbed = new EmbedBuilder()
		.setTitle("Are you sure?")
		.setDescription(
			`This is a very nice ${realFurnitureItem.material} ${realFurnitureItem.type}, but it is worth $${nFormat(sellValue)}`,
		)
		.setColor(Color.BLUE)
		.setFooter({
			text: "Expires in 60 seconds",
		});

	const confirmComponent = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setLabel("Confirm")
			.setCustomId("confirm")
			.setStyle(ButtonStyle.Danger),
	);

	const confirmMessage = await interaction.reply({
		embeds: [sellConfirmEmbed],
		components: [confirmComponent],
	});

	confirmMessage
		.awaitMessageComponent({
			filter: (i) => i.user.id === user.userId,
			time: 60_000,
		})
		.then(async (newI) => {
			try {
				await db.transaction(async (t) => {
					await t
						.update(usersTable)
						.set({
							balance: increment(usersTable.balance, sellValue),
						})
						.where(eq(usersTable.userId, user.userId));

					await t
						.delete(furnitureTable)
						.where(eq(furnitureTable.id, furnitureItem[0].id));
				});

				const soldEmbed = new EmbedBuilder()
					.setTitle("Item Sold!")
					.setDescription(
						`Sold a ${realFurnitureItem.material} ${realFurnitureItem.type} for $${nFormat(sellValue)}`,
					)
					.setColor(Color.BLUE);

				await newI.reply({
					embeds: [soldEmbed],
				});
			} catch (e) {
				console.error(e);

				await newI.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle("Something went wrong")
							.setDescription("Try again later.")
							.setColor(Color.RED)
							.setFooter({
								text: "This error has been logged.",
							}),
					],
				});
			}
		})
		.catch(async () => {
			try {
				await confirmMessage.edit({
					embeds: [sellConfirmEmbed.setColor(Color.RED).setTitle("Expired")],
					components: [],
				});
			} catch (e) {
				console.error(e);
			}
		});
};
