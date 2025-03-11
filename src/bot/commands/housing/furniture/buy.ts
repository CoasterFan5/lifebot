import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentBuilder,
	EmbedBuilder,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { increment } from "../../../../db/increment";
import { furnitureTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import { furnitureTypes } from "./furnitureTypes";
import { type Material, materials } from "./materialList";

export const buy: LifebotCommandHandler = async ({ interaction, user }) => {
	const isAntique = Math.random() > 0.95;

	const furnitureItem: {
		originalValue: number;
		type: string;
		condition: number;
		material: Material;
		antique: boolean;
		age: number;
	} = {
		originalValue: Math.floor(Math.random() * 1000 + 1),
		type: furnitureTypes[Math.floor(Math.random() * furnitureTypes.length)],
		condition: Math.floor(Math.random() * 100 + 1),
		material: materials[Math.floor(Math.random() * materials.length)],
		antique: isAntique,
		age: isAntique
			? Math.floor(Math.random() * 9985 + 15)
			: Math.floor(Math.random() * 15),
	};

	const purchasePrice = Math.floor(Math.random() * 500 + 2500);

	const purchaseEmbed = new EmbedBuilder()
		.setTitle("Purchase Furniture?")
		.setColor(Color.BLUE)
		.setDescription(
			`Purchase a random piece of furniture for $${nFormat(purchasePrice)}`,
		)
		.setFooter({ text: "Expires in 60 seconds" });

	const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setStyle(ButtonStyle.Success)
			.setLabel("Confirm")
			.setCustomId("confirm"),
	);

	const sentReply = await interaction.reply({
		embeds: [purchaseEmbed],
		components: [components],
	});

	sentReply
		.awaitMessageComponent({
			time: 3_000,
			filter: (i) => i.user.id === user.userId,
		})
		.then(async (newI) => {
			await db
				.update(usersTable)
				.set({
					balance: increment(usersTable.balance, -purchasePrice),
				})
				.where(eq(usersTable.userId, user.userId));

			const createdItem = await db
				.insert(furnitureTable)
				.values({
					ownerId: user.userId,
					originalValue: furnitureItem.originalValue,
					type: furnitureItem.type,
					condition: furnitureItem.condition,
					material: furnitureItem.material,
					antique: furnitureItem.antique,
					age: furnitureItem.age,
				})
				.returning();

			const isAn = /^[a|e|i|o|u].*/gm.test(
				furnitureItem.material.toLowerCase(),
			);

			await newI.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(
							`You got ${isAn ? "an" : "a"} ${furnitureItem.material} ${furnitureItem.type}`,
						)
						.setDescription(
							`Congrats! View all info with \`/furniture info ${createdItem[0].id}\``,
						)
						.setColor(Color.BLUE),
				],
			});
		})
		.catch(() => {
			sentReply.edit({
				embeds: [
					purchaseEmbed
						.setColor(Color.RED)
						.setTitle("Purchase Furniture? (Expired)"),
				],
			});
		});
};
