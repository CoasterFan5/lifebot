import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import type { JobTier } from "../../types/jobList";
import { jobPaths } from "./jobList";
import { Color } from "../../utils/colors";
import { camelCaseToTitle } from "../../utils/camelCaseToTitle";

export const search: LifebotCommandHandler = async (
  interaction,
  user,
  client,
) => {
  // generate 3 random jobs

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
        .setLabel(`Appy for job ${i + 1}`)
        .setCustomId(i.toString())
        .setStyle(ButtonStyle.Success),
    );
  }

  await interaction.reply({
    embeds: [embed],
    components: [row],
  });
};
