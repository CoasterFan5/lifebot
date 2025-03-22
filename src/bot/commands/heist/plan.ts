import { LifebotCommandHandler } from "../../types/commandTypes";

export const plan: LifebotCommandHandler = async ({ interaction }) => {
	interaction.reply("Plan mode.");
};
