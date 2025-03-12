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

type LifebotCommandProps = {
	interaction: ChatInputCommandInteraction<CacheType>;
	user: typeof usersTable.$inferSelect;
	client: Client<boolean>;
};

export type LifebotCommandHandler = (
	props: LifebotCommandProps,
) => Promise<unknown>;

export type LifebotCommand = {
	command: SharedSlashCommand;
	handler: LifebotCommandHandler;
};
