import { BitField, Client, IntentsBitField, InteractionType } from "discord.js";
import { commands } from "./commands";

const token = process.env.TOKEN!;

const client = new Client({
  intents: [IntentsBitField.Flags.GuildMessages],
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type == InteractionType.ApplicationCommand) {
    try {
      commands[interaction.commandName].handler(interaction);
    } catch (e) {
      interaction.reply("Something went wrong...");
    }
  }
});

client.login(token);
console.info("Bot started");
