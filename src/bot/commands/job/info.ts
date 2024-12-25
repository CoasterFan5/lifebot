import { EmbedBuilder } from "discord.js";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import type { StringedObject } from "../../types/stringedObject";
import { Color } from "../../utils/colors";
import { getPersonalizedEmbed } from "../../utils/personalizedEmbed";
import { jobPaths } from "./jobList";

const noJobEmbed = new EmbedBuilder()
	.setTitle("You don't have a job.")
	.setDescription("Get your money up.")
	.setColor(Color.RED)
	.setFooter({
		text: "Try /job search",
	});

export const info: LifebotCommandHandler = async (
	interaction,
	user,
	client,
) => {
	if (!user.hasJob) {
		interaction.reply({
			embeds: [noJobEmbed],
		});
		return;
	}

	const isThereANextTier =
		jobPaths[user.jobPath].tiers.length > user.jobTierIndex + 1;

	const jobDetails = jobPaths[user.jobPath].tiers[user.jobTierIndex];
	const nextJobDetails = jobPaths[user.jobPath].tiers[user.jobTierIndex + 1];

	const jobSkillsInfo = [];
	for (const key in jobDetails.xpGrants) {
		jobSkillsInfo.push(
			`${key}: ${(user as unknown as StringedObject<number>)[key]}/${(nextJobDetails.requirements as StringedObject<number>)[key] || "0"} | +${(jobDetails.xpGrants as StringedObject<number>)[key]}`,
		);
	}

	const jobInfoEmbed = getPersonalizedEmbed(interaction.user);
	jobInfoEmbed.addFields(
		{
			name: "Job Info",
			value: [
				`**${user.jobName}** at ${user.jobCompany}`,
				`Pay range: $${user.jobMinPay}-$${user.jobMaxPay}`,
				`Job Tier: ${user.jobTierIndex + 1}/${jobPaths[user.jobPath].tiers.length}`,
			].join("\n"),
		},
		{
			name: "Skill Info",
			value: jobSkillsInfo.join("\n"),
		},
	);

	interaction.reply({
		embeds: [jobInfoEmbed],
	});
};
