import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import type {
  LifebotCommand,
  LifebotCommandHandler,
} from "../../types/commandTypes";

const subCommandHandlers: {
  [key: string]: LifebotCommandHandler;
} = {};

export const furniture: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("furniture")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("inventory")
        .setDescription("View furniture you have"),
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("buy")
        .setDescription("Buy a new piece of furniture"),
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("sell")
        .setDescription("Sell a piece of furniture"),
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("info")
        .setDescription("View a piece of furniture you have"),
    ),
  handler: async (params) => {
    subCommandHandlers[params.interaction.options.getSubcommand(true)](params);
  },
};
