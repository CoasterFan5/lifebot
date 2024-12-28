import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { workMessages } from "../textBank/work";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
import { jobWork } from "./job/jobWork";

const WORK_COOLDOWN = 60_000; // ms in work cooldown

export const work: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("work")
		.setDescription("Do a job to earn money!"),
	handler: async (interaction, user, client) => {
		const currentTime = Date.now();
		const msSinceLastWork = currentTime - (user.lastWork?.getTime() || 0);
		if (msSinceLastWork < WORK_COOLDOWN) {
			const timeToWork = Math.ceil((WORK_COOLDOWN - msSinceLastWork) / 1000);

			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(Color.RED)
						.setTitle("Calm down!")
						.setDescription(`You can work again in ${timeToWork} seconds`),
				],
			});
			return;
		}

		if (user.hasJob) {
			await jobWork(interaction, user, client);
			return;
		}

		const amount = Math.floor(Math.random() * 900) + 100;
		await db
			.update(usersTable)
			.set({ balance: amount + (user.balance || 0), lastWork: new Date() })
			.where(eq(usersTable.userId, user.userId));

		const messageIndex = Math.floor(Math.random() * workMessages.length);
		const message = workMessages[messageIndex].replaceAll("{}", `$${amount}`);

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(Color.GREEN)
					.setDescription(message)
					.setAuthor({
						name: interaction.user.displayName,
						iconURL: interaction.user.displayAvatarURL(),
					}),
			],
		});
	},
};
