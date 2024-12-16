import {
	type CacheType,
	type ChatInputCommandInteraction,
	type Client,
	type MessageContextMenuCommandInteraction,
	type SharedSlashCommand,
	SlashCommandBuilder,
	type UserContextMenuCommandInteraction,
} from "discord.js";

import type { usersTable } from "../../db/schema";

export type LifebotCommand = {
	command: SharedSlashCommand;
	handler: (
		interaction: ChatInputCommandInteraction<CacheType>,
		user: typeof usersTable.$inferSelect,
		client: Client<boolean>,
	) => Promise<void>;
};
