import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import type { LifebotCommand } from "../../types/commandTypes";

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

    // handle sub command
  },
};
