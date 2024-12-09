import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from "discord.js";

import { usersTable } from "../db/schema";

export type LifebotCommand = {
  command: SlashCommandBuilder;
  handler: (
    interaction:
      | ChatInputCommandInteraction<CacheType>
      | MessageContextMenuCommandInteraction<CacheType>
      | UserContextMenuCommandInteraction<CacheType>,
    user: typeof usersTable.$inferSelect,
    clinet: Client<boolean>,
  ) => Promise<void>;
};
