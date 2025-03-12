import {
	EmbedBuilder,
	Poll,
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
} from "discord.js";
import type { LifebotCommand } from "../../types/commandTypes";
import { Color } from "../../utils/colors";

const embeds: {
	[key: string]: EmbedBuilder;
} = {
	basic: new EmbedBuilder()
		.setTitle("Basic Help")
		.setColor(Color.GREEN)
		.setDescription("Basic bot info")
		.addFields(
			{
				name: "What is a 'lifebot?'",
				value:
					"Lifebot is Discord's 21,718th best economy bot. In life bot, you earn money and have a life with the end goal of being the number one lifebotter!",
			},
			{
				name: "Getting Started",
				value:
					"Getting started is easy, just type /work and you will make your first money.",
			},
			{
				name: "What next?",
				value: "This bot has jobs, housing, furniture, and more to come!",
			},
			{
				name: "Help Info",
				value:
					"All help menus feature a command list. Optional arguments are in (), and required arguments are in <>",
			},
			{
				name: "All Basic Commands",
				value: [
					"`/work` - Work a gig",
					"`/crime` - Do a bad thing",
					"`/balance` - View balance",
					"`/pay` - Pay another player",
					"`/work` - work a gig",
					"`/skills` - View skills",
					"`/rank` - View ranking info",
					"`/support` - View support server info",
					"`/source` - View bot source code on Github",
					"`/invite` - Invite the bot to your own discord",
					"`/help <basic, housing, jobs, furniture>` - Show help menus",
				].join("\n"),
			},
		),
	jobs: new EmbedBuilder()
		.setTitle("Jobs Help")
		.setDescription("Jobs allow you to increase earnings when using /work")
		.setColor(Color.ORANGE)
		.addFields(
			{
				name: "Getting a job",
				value:
					"Get a job with `/job search`, this will present you with three job options for you to choose from. Select one and apply.",
			},
			{
				name: "Working",
				value: "Once you have a job, just type `/work`",
			},
			{
				name: "Keeping a job",
				value:
					"Every once in a while, you will need to attend an emergency meeting, make sure you click the confirm button or you will be fired.",
			},
			{
				name: "Skills",
				value:
					"When working you will earn skill xp, type `/skills` to view this info",
			},
			{
				name: "All commands",
				value: [
					"`/job search` - Search for a job",
					"`/job quit` - Quit a job",
					"`/job info` - View job info",
				].join("\n"),
			},
		),
	housing: new EmbedBuilder()
		.setTitle("Housing Help")
		.setDescription("Buy, sell, lease, and more with the housing features!")
		.setColor(Color.BLUE)
		.addFields(
			{
				name: "Getting started",
				value:
					"Get started with `/house buy`, and select your dream house, or more realistically, settle for one of the provided options. **Note**, once you purchase a house, it's value will immediately be lower than the price you paid.",
			},
			{
				name: "Lease Homes",
				value:
					"Lease your house and collect rent with `/house lease`, and collect from your tenants with `/house collect <id>`",
			},
			{
				name: "Unsatisfied?",
				value: "Sell your humble abode with `/house sell <id>`",
			},
			{
				name: "Furniture",
				value:
					"To increase a houses value even more, you can add furniture! (See `/help furniture`) Adding furniture increases the furniture score. Note, this score caps at 100/100.",
			},
			{
				name: "All Commands:",
				value: [
					"`/house buy` - Purchase a new house",
					"`/house info (id)` - View info about a house",
					"`/house lease` - Lease a house",
					"`/house sell <id>` - Bye bye house, hello money!",
					"`/house collect` - Collect rent from leased homes, once an hour",
					"`/house renovate <id>` - Increase the quality of a house, for a price",
					"`/house furnish <house id> <furniture id>` - Add furniture.",
				].join("\n"),
			},
		),
	furniture: new EmbedBuilder()
		.setTitle("Furniture help")
		.setColor(Color.BLUE)
		.setDescription(
			"Increase house value with a wide variety of furniture items!",
		)
		.addFields(
			{
				name: "Getting started",
				value:
					"Get started with `/furniture buy` to pay a random price for a random piece of furniture!. Each item has a random material and type.",
			},
			{
				name: "Materials",
				value:
					"All furniture has a random material assigned, which factors into it's value and score. They range from plastic to teakwood.",
			},
			{
				name: "Score and Sell Value",
				value:
					"All furniture is given a score and sell value. Furniture can be added to homes to increase the homes furniture score by the score amount, or sold for the sell price with `/furniture sell`.",
			},
			{
				name: "All Commands",
				value: [
					"`/furniture buy` - Purchase a new piece of furniture",
					"`/house info (id) (page)` - View info about furniture",
					"`/house sell <id>` - Bye bye furniture, hello money!",
					"`/house reclaim <id>` - Remove a piece of furniture from a house.",
				].join("\n"),
			},
		),
};

export const help: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Help with commands")
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("basic")
				.setDescription("Basic commands"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("jobs")
				.setDescription("Jobs help"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("housing")
				.setDescription("Help with housing system"),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName("furniture")
				.setDescription("Help with furniture system"),
		),
	handler: async ({ interaction }) => {
		const subCommandName = interaction.options.getSubcommand(true);

		if (embeds[subCommandName]) {
			interaction.reply({
				embeds: [embeds[subCommandName]],
			});
			return;
		}

		interaction.reply("Something went wrong");
	},
};
