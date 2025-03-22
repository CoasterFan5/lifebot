import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import type {
	LifebotCommand,
	LifebotCommandHandler,
} from "../../types/commandTypes";
import { plan } from "./plan";

const subCommands: {
	[key: string]: LifebotCommandHandler;
} = {
	plan: plan,
};

export const heist: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("heist")
		.setDescription("Theivin")
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("plan")
				.setDescription("plan a heist"),
		),
	handler: async (params) => {
		const { interaction } = params;
		const subCommand = interaction.options.getSubcommand(true);

		try {
			if (subCommands[subCommand]) {
				await subCommands[subCommand](params);
			}
		} catch (e) {
			console.warn(e);
			interaction.reply("Something went wrong...");
		}
	},
};
