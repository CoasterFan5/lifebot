import {
	REST,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from "discord.js";
import { commands } from "./commands";

const items: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
for (const key in commands) {
	const command = commands[key];
	items.push(command.command.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN!);

if (process.env.DEPLOY_TO_GUILD) {
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.APP_ID!,
				process.env.DEPLOY_TO_GUILD,
			),
			{
				body: items,
			},
		);
		console.log("Deployed");
	} catch (e) {
		console.error("failed to deploy commands");
	}
} else {
	try {
		await rest.put(Routes.applicationCommands(process.env.APP_ID!), {
			body: items,
		});
		console.log("Deployed globally");
	} catch (e) {
		console.error(e);
	}
}
