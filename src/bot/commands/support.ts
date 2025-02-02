import { SlashCommandBuilder } from "discord.js";
import type { LifebotCommand } from "../types/commandTypes";
import { getPersonalizedEmbed } from "../utils/personalizedEmbed";

export const support: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Support server link"),
  handler: async ({ interaction, user, client }) => {
    const embed = getPersonalizedEmbed(interaction.user);
    embed.setDescription(
      "I am here to help! Just join the [support server](https://discord.gg/BDF3efd8KM)",
    );
    interaction.reply({
      embeds: [embed],
    });
    return;
  },
};
