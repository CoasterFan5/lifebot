import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { LifebotCommand } from "../types/commandTypes";
import { Colors } from "../utils/colors";

export const balance: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance"),
  handler: async (interaction, user) => {
    const embed = new EmbedBuilder()
      .setTitle("Balance")
      .setColor(Colors.GREEN)
      .setDescription(`You have $${user.balance?.toString()}!`);

    interaction.reply({
      embeds: [embed],
    });
  },
};
