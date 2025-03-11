//

import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";

const invite_link =
	"https://discord.com/oauth2/authorize?client_id=847445195888263168&permissions=1689917160015936&integration_type=0&scope=bot";

export const invite: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Invite this bot to a different server!"),
	handler: async ({ interaction, user, client }) => {
		const serverCount = client.guilds.cache.size;

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle("Lifebot Grows!")
					.setColor(Color.GREEN)
					.setDescription(`[Click to invite](${invite_link})`)
					.setFooter({
						text: `Lifebot is in ${serverCount} servers, you could be number ${serverCount + 1}!`,
					}),
			],
		});
	},
};
