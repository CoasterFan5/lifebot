import {
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandUserOption,
} from "discord.js";
import { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";

const errorEmbedTemplate = new EmbedBuilder()
  .setTitle("Uh Oh!")
  .setColor(Color.RED);

export const pay: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pay another person")
    .addUserOption(
      new SlashCommandUserOption()
        .setName("user")
        .setDescription("The user to pay")
        .setRequired(true),
    )
    .addIntegerOption(
      new SlashCommandIntegerOption()
        .setName("amount")
        .setDescription("The amount to pay")
        .setRequired(true),
    ),
  handler: async (interaction, user) => {
    if((user.balance || 0) < interaction.options.get(""))
  },
};
