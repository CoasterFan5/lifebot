import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import type {
	LifebotCommand,
	LifebotCommandHandler,
} from "../../types/commandTypes";
import { info } from "./info";
import { quit } from "./quit";
import { search } from "./search";

const subCommandHandlers: { [key: string]: LifebotCommandHandler } = {
	search: search,
	info: info,
	quit: quit,
};

export const job: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("job")
		.setDescription("Manage job.")
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("search")
				.setDescription("Look for a new job"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("info")
				.setDescription("Info on current job"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("quit")
				.setDescription("Quit your current job"),
		),
	handler: async (interaction, user, client) => {
		const subCommand = interaction.options.getSubcommand(true);
		console.log(subCommand);

		// handle sub command
		try {
			subCommandHandlers[subCommand](interaction, user, client);
		} catch (e) {}
	},
};
