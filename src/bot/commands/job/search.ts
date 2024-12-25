import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import type { JobTier } from "../../types/jobs";
import { camelCaseToTitle } from "../../utils/camelCaseToTitle";
import { Color } from "../../utils/colors";
import { jobPaths } from "./jobList";
import { checkUserRequirements } from "./jobUtils/checkUserRequirements";

const expiredEmbed = new EmbedBuilder()
	.setTitle("Expired")
	.setDescription("Job search expired")
	.setColor(Color.RED);

const unqualifiedEmbed = new EmbedBuilder()
	.setTitle("Not qualified")
	.setDescription("You don't have the correct skills for this job.")
	.setColor(Color.RED);

const jobAppliedForEmbed = new EmbedBuilder()
	.setTitle("Job applied for!")
	.setDescription(
		"You have already applied for a job, so we cleaned up this job search for you.",
	)
	.setColor(Color.ORANGE);

const alreadyHaveJob = new EmbedBuilder()
	.setTitle("You are already employed.")
	.setDescription(
		"You can't job hunt if you already have a job!\nWhy? Because I hate you personally.",
	)
	.setColor(Color.RED);

export const search: LifebotCommandHandler = async (
	interaction,
	user,
	client,
) => {
	// generate 3 random jobs

	if (user.hasJob) {
		interaction.reply({
			embeds: [alreadyHaveJob],
		});
		return;
	}

	const embed = new EmbedBuilder()
		.setTitle("Job Search")
		.setDescription("It's time to get employed!")
		.setColor(Color.GREEN)
		.setFooter({ text: "This will time out in 60 seconds" });
	const row = new ActionRowBuilder<ButtonBuilder>();

	const shownJobList: {
		companyName: string;
		companyIndex: number;
		pathString: string;
		jobDesc: JobTier;
	}[] = [];

	for (let i = 0; i < 3; i++) {
		const pathList = Object.keys(jobPaths);
		const pathString = pathList[Math.floor(Math.random() * pathList.length)];
		const path = jobPaths[pathString];
		const companyIndex = Math.floor(Math.random() * path.companies.length);
		const companyName = path.companies[companyIndex];

		const jobDesc = path.tiers[0];

		shownJobList.push({
			companyName,
			companyIndex,
			pathString,
			jobDesc,
		});

		const reqString = [];
		for (const key in jobDesc.requirements) {
			const value = (jobDesc.requirements as { [key: string]: number })[key];
			if (value > 0) {
				reqString.push(`${camelCaseToTitle(key)} - ${value}xp`);
			}
		}

		embed.addFields({
			name: `${jobDesc.title}`,
			value: `Starting Pay: ${jobDesc.basePay}\nMax Pay: ${jobDesc.maxPay}\nCompany: ${companyName}\n\nRequirements:\n ${reqString.join("\n")}`,
			inline: true,
		});

		row.addComponents(
			new ButtonBuilder()
				.setLabel(`Apply for job ${i + 1}`)
				.setCustomId(i.toString())
				.setStyle(ButtonStyle.Success),
		);
	}

	const sent = await interaction.reply({
		embeds: [embed],
		components: [row],
	});

	try {
		sent
			.awaitMessageComponent({
				filter: (i) => i.isButton() && i.user.id === interaction.user.id,
				time: 60_000,
			})
			.catch((e) => {
				interaction.editReply({
					embeds: [expiredEmbed],
					components: [],
				});
			})
			.then(async (newInteraction) => {
				if (!newInteraction || !newInteraction.isButton()) {
					console.log("Exiting Early");
					return;
				}

				const jobNumber = Number.parseInt(newInteraction.customId);
				const jobDetails = shownJobList[jobNumber];

				// remove job options
				interaction.editReply({
					embeds: [jobAppliedForEmbed],
					components: [],
				});

				if (!checkUserRequirements(user, jobDetails.jobDesc.requirements)) {
					newInteraction.reply({
						embeds: [unqualifiedEmbed],
					});
					return;
				}
				// grant the job

				await db
					.update(usersTable)
					.set({
						hasJob: true,
						reputation: 0,
						jobTierIndex: 0,
						jobPath: jobDetails.pathString,
						jobCompany: jobDetails.companyName,
						jobName: jobDetails.jobDesc.title,
						jobMinPay: jobDetails.jobDesc.basePay,
						jobMaxPay: jobDetails.jobDesc.maxPay,
					})
					.where(eq(usersTable.userId, user.userId));

				await newInteraction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle("Welcome to the working class.")
							.setDescription(
								`Today you start life as a ${jobDetails.jobDesc.title}\nFrom now on, using /work will work your job.`,
							)
							.setColor(Color.ORANGE),
					],
				});
			});
	} catch (e) {
		console.warn(e);
	}
};
