import { SlashCommandBuilder } from "discord.js";

export type LifebotCommand = {
  command: SlashCommandBuilder;
  handler: () => Promise<void>;
};
