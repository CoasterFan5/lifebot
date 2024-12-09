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

      commands[interaction.commandName].handler(interaction, user);
    } catch (e) {
      interaction.reply("Something went wrong...");
    }
  }
});

client.login(token);
console.info("Bot started");
