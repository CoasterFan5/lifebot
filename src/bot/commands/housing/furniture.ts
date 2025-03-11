import {
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	SlashCommandSubcommandBuilder,
} from "discord.js";
import type {
	LifebotCommand,
	LifebotCommandHandler,
} from "../../types/commandTypes";
import { buy } from "./furniture/buy";
import { info } from "./furniture/info";

const subCommandHandlers: {
	[key: string]: LifebotCommandHandler;
} = {
	buy,
	info,
};

export const furniture: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("furniture")
		.setDescription("Furniture")
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("buy")
				.setDescription("Buy a new piece of furniture"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("sell")
				.setDescription("Sell a piece of furniture")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("Id of the furniture")
						.setRequired(true),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("info")
				.setDescription("View a piece of furniture you have")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("Id of the furniture")
						.setRequired(false),
				)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("page")
						.setDescription("The info page to view")
						.setRequired(false),
				),
		),
	handler: async (params) => {
		subCommandHandlers[params.interaction.options.getSubcommand(true)](params);
	},
};
