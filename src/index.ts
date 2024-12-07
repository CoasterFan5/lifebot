import { BitField, Client, IntentsBitField, InteractionType } from "discord.js";
import { commands } from "./commands";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

const token = process.env.TOKEN!;

const client = new Client({
  intents: [IntentsBitField.Flags.GuildMessages],
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type == InteractionType.ApplicationCommand) {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, interaction.user.id));

      commands[interaction.commandName].handler(interaction);
    } catch (e) {
      interaction.reply("Something went wrong...");
    }
  }
});

client.login(token);
console.info("Bot started");
