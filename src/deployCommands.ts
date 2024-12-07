import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { commands } from "./commands";
import { LifebotCommand } from "./types/commandTypes";

const deployToSever = true;
const serverId = "657349226933780521";

const items: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
for (const key in commands) {
  const command = commands[key];
  items.push(command.command.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN!);
try {
  await rest.put(
    Routes.applicationGuildCommands(process.env.APP_ID!, serverId),
    {
      body: items,
    },
  );
  console.log("Deployed");
} catch (e) {
  console.log(e);
  console.error("failed to deploy commands");
}
