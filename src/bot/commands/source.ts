import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";

export const source: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("source")
    .setDescription("View the bot's source code"),
  handler: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    embed.setTitle("Source Code");
    embed.setDescription(
      "[Github Link](https://github.com/CoasterFan5/lifebot)",
    );
    embed.setColor(Color.GREEN);

    interaction.reply({
      embeds: [embed],
    });
  },
};
