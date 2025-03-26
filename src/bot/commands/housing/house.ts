import {
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	SlashCommandSubcommandBuilder,
} from "discord.js";
import type {
	LifebotCommand,
	LifebotCommandHandler,
} from "../../types/commandTypes";
import { buy } from "./house/buy";
import { collect } from "./house/collect";
import { furnish } from "./house/furnish";
import { info } from "./house/info";
import { lease } from "./house/lease";
import { renovate } from "./house/renovate";
import { sell } from "./house/sell";
import { bulkFurnish } from "./house/bulkFurnish";

const houseCommands: {
	[key: string]: LifebotCommandHandler;
} = {
	buy,
	info,
	sell,
	lease,
	renovate,
	collect,
	furnish,
	bulk_furnish: bulkFurnish,
};

export const house: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("house")
		.setDescription("Housing features")
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("buy")
				.setDescription("buy a new house"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("sell")
				.setDescription("Sell a house.")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("A house id")
						.setRequired(true),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("lease")
				.setDescription("Find a tenant for a house")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("A house id")
						.setRequired(true),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("renovate")
				.setDescription("Renovate a house to restore it's quality")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("The id of the house.")
						.setRequired(true),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("info")
				.setDescription("View a houses info")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("The id of the house.")
						.setRequired(false),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("collect")
				.setDescription("Collect rent from a house")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("id")
						.setDescription("The id of the house.")
						.setRequired(false),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("furnish")
				.setDescription("Place furniture in a house")
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("house")
						.setDescription("The id of the house.")
						.setRequired(true),
				)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("furniture")
						.setDescription("The furniture's id")
						.setRequired(true),
				),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("bulk_furnish")
				.setDescription(
					"Place unassigned furniture you own with id from <start> to <end> in a house",
				)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("house")
						.setDescription("The id of the house")
						.setRequired(true),
				)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("start")
						.setDescription("Add unassigned furniture from this id")
						.setRequired(true),
				)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName("end")
						.setDescription("Add unassigned furniture to this id")
						.setRequired(true),
				),
		),
	handler: async (props) => {
		const { interaction } = props;
		const subCommand = interaction.options.getSubcommand(true);

		try {
			houseCommands[subCommand](props);
		} catch (e) {
			console.error(e);
			interaction.reply("Error executing this command, try again later.");
		}
	},
};
