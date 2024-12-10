import {
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandUserOption,
} from "discord.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
import { getPersonalizedEmbed } from "../utils/personalizedEmbed";

const errorEmbedTemplate = new EmbedBuilder()
	.setTitle("Uh Oh!")
	.setColor(Color.RED);

export const pay: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("pay")
		.setDescription("Pay another person")
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("The user to pay")
				.setRequired(true),
		)
		.addIntegerOption(
			new SlashCommandIntegerOption()
				.setName("amount")
				.setDescription("The amount to pay")
				.setRequired(true),
		),
	handler: async (interaction, user) => {
		if (!interaction.isChatInputCommand()) {
			return;
		}

		const payAmount = interaction.options.getInteger("amount", true);
		const otherDiscordUser = interaction.options.getUser("user", true);

		console.log();

		if (payAmount < 0) {
			await db
				.update(usersTable)
				.set({
					balance: sql`${usersTable.balance} - 10`,
				})
				.where(eq(usersTable.userId, user.userId));

			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(Color.RED)
						.setTitle("Nice try")
						.setDescription(
							`I have fined you $10 for trying to steal money from <@${otherDiscordUser.id}>`,
						),
				],
			});

			return;
		}

		if ((user.balance || 0) < payAmount) {
			interaction.reply({
				embeds: [
					errorEmbedTemplate.setDescription("You can't afford this. Brokie."),
				],
			});
			return;
		}
		await db
			.insert(usersTable)
			.values({
				userId: otherDiscordUser.id,
				balance: payAmount,
			})
			.onConflictDoUpdate({
				target: usersTable.userId,
				set: {
					userId: otherDiscordUser.id,
					balance: sql`${usersTable.balance} + ${payAmount}`,
				},
			});

		await db
			.update(usersTable)
			.set({
				balance: (user.balance || 0) - payAmount,
			})
			.where(eq(usersTable.userId, user.userId));

		interaction.reply({
			embeds: [
				getPersonalizedEmbed(interaction.user).setDescription(
					`You sent $${payAmount} to <@${otherDiscordUser.id}>`,
				),
			],
		});
	},
};
