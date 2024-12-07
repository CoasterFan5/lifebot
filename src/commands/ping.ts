import { SlashCommandBuilder } from "discord.js";
import { LifebotCommand } from "../types/commandTypes";

export const ping: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),
  handler: async () => {},
};
