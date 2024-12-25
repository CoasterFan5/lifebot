import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import { Color } from "../../utils/colors";

const noJobEmbed = new EmbedBuilder()
	.setTitle("You don't have a job.")
	.setDescription("Get your money up.")
	.setColor(Color.ORANGE)
	.setFooter({
		text: "Try /job search",
	});

const rowWithDisabledButton =
	new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setLabel("Confirm")
			.setStyle(ButtonStyle.Danger)
			.setCustomId("ConfirmJobQuit")
			.setDisabled(true),
	);

const expiredEmbed = new EmbedBuilder()
	.setTitle("Expired")
	.setDescription("This message has expired. Sorry.")
	.setColor(Color.RED);

const confirmEmbed = new EmbedBuilder()
	.setTitle("Are you sure?")
	.setDescription(
		"Are you sure you want to quit your job?\nYou will lose all reputation you have.\nIf not, just ignore this message.",
	)
	.setColor(Color.ORANGE);

const jobQuitEmbed = new EmbedBuilder()
	.setTitle("Freedom alas")
	.setDescription(
		"You have quit your job and are now free from the working class. Coincidently, you are also an unemployed loser.",
	)
	.setColor(Color.ORANGE);

const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
	new ButtonBuilder()
		.setLabel("Confirm")
		.setStyle(ButtonStyle.Danger)
		.setCustomId("ConfirmJobQuit"),
);

export const quit: LifebotCommandHandler = async (
	interaction,
	user,
	client,
) => {
	if (!user.hasJob) {
		interaction.reply({
			embeds: [noJobEmbed],
		});
		return;
	}

	const reply = await interaction.reply({
		embeds: [confirmEmbed],
		components: [row],
	});

	reply
		.awaitMessageComponent({
			filter: (i) => i.isButton() && i.user.id === interaction.user.id,
			time: 30_000,
		})
		.then(async () => {
			// quit the job

			await db
				.update(usersTable)
				.set({
					reputation: 0,
					hasJob: false,
				})
				.where(eq(usersTable.userId, user.userId));

			await interaction.editReply({
				embeds: [jobQuitEmbed],
				components: [],
			});
		})
		.catch((e) => {
			interaction.editReply({
				embeds: [expiredEmbed],
				components: [rowWithDisabledButton],
			});
		});
};
