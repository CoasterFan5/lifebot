import { EmbedBuilder } from "discord.js";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import type { JobTier } from "../../types/jobList";
import { jobPaths } from "./jobList";
import { Color } from "../../utils/colors";

export const search: LifebotCommandHandler = async (
  interaction,
  user,
  client,
) => {
  // generate 3 random jobs

  const embed = new EmbedBuilder()
    .setTitle("Job Search")
    .setDescription("It's time to get employed!")
    .setColor(Color.GREEN);

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
    for (const item in Object.entries(jobDesc.requirements)) {
      const [key, value] = item;
      reqString.push(`${key} - ${value}xp`);
    }

    embed.addFields({
      name: `${jobDesc.title} - ${companyName}`,
      value: `Starting Pay: ${jobDesc.basePay}\nRequirements: ${reqString.join("\n")}`,
      inline: true,
    });
  }

  interaction.reply({
    embeds: [embed],
  });
};
