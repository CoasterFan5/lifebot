import {
	ActivityType,
	BitField,
	Client,
	EmbedBuilder,
	Events,
	GatewayIntentBits,
	IntentsBitField,
	InteractionType,
	Poll,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { commands } from "./commands";
import { quickTimeEvents } from "./quickTimeEvents";
import { Color } from "./utils/colors";

const token = process.env.TOKEN;
const botDisabled = process.env.DISABLE_BOT?.toLowerCase() === "true";

const disabledEmbed = new EmbedBuilder()
	.setColor(Color.GREEN)
	.setTitle("We'll be right back!")
	.setDescription(
		"Life bot seems to be disabled right now. This is not good. If you must know whats going on, join the [support server](https://discord.gg/J5esKPaANg)",
	);

const client = new Client({
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
});

// Quick time events
client.on("messageCreate", async (message) => {
	if (botDisabled) {
		return;
	}

	if (Math.floor(Math.random() * 250) > 0) {
		return;
	}

	if (message.author.bot) {
		return;
	}

	const event =
		quickTimeEvents[Math.floor(Math.random() * quickTimeEvents.length)];
	event(message);
});

client.on("interactionCreate", async (interaction) => {
	if (botDisabled) {
		if (interaction.isRepliable()) {
			interaction.reply({
				embeds: [disabledEmbed],
			});
		}
		return;
	}

	if (interaction.isChatInputCommand()) {
		try {
			let userSelectResult = await db
				.select()
				.from(usersTable)
				.where(eq(usersTable.userId, interaction.user.id));
			if (userSelectResult.length < 1) {
				userSelectResult = await db
					.insert(usersTable)
					.values({
						userId: interaction.user.id,
						balance: 0,
					})
					.returning();
			}

			const user = userSelectResult[0];

			commands[interaction.commandName].handler({ interaction, user, client });
		} catch (e) {
			console.error(e);
			interaction.reply("Something went wrong...");
		}
	}
});

client.on(Events.ClientReady, (e) => {
	client.user?.setActivity({
		name: "New Housing Update",
		type: ActivityType.Playing,
	});
	console.info("Bot started");
});

client.login(token);
console.info("Bot started");

process.on("uncaughtException", async (err, origin) => {
	if (!client.isReady()) {
		console.error(
			"Client not ready when critical error occurred.",
			origin,
			err,
		);
		return;
	}

	console.error(err);

	const chan = await client.channels.fetch("1336093534880665684");
	if (chan?.isSendable()) {
		chan.send(
			[
				"Lifebot just threw a critical error. This log signifies a crash was prevented.",
				`Origin: \`${origin}\``,
				`Error: \`${err}\``,
				`Stack: \`\`\`${err.stack}\`\`\``,
			].join("\n"),
		);
	}
});
