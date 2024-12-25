import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import { getPersonalizedEmbed } from "../../utils/personalizedEmbed";
import { jobPaths } from "./jobList";
import { workMessages } from "./textBank/textBank";
import { increment } from "../../../db/increment";
import { checkForPromotion } from "./jobUtils/checkForPromotion";
import { EmbedBuilder } from "discord.js";
import { Color } from "../../utils/colors";

export const jobWork: LifebotCommandHandler = async (
  interaction,
  user,
  client,
) => {
  const userJobInfo = jobPaths[user.jobPath].tiers[user.jobTierIndex];

  const min = userJobInfo.basePay;
  const max = userJobInfo.maxPay;

  const thisPay = Math.floor(Math.random() * (max - min)) + min;

  const message = workMessages[Math.floor(Math.random() * workMessages.length)];
  const fullMessage = message
    .replaceAll("{jobTitle}", user.jobName.toLowerCase())
    .replaceAll("{amount}", thisPay.toString())
    .replaceAll("{company}", user.jobCompany);

  const xpGrants = userJobInfo.xpGrants;

  // This is a lot, but it just updates the balance, last work, and xp

  const newUser = await db
    .update(usersTable)
    .set({
      balance: thisPay + (user.balance || 0),
      //lastWork: new Date(),
      technicalSkills: increment(
        usersTable.technicalSkills,
        xpGrants.technicalSkills || 0,
      ),
      creativity: increment(usersTable.creativity, xpGrants.creativity || 0),
      customerService: increment(
        usersTable.customerService,
        xpGrants.customerService || 0,
      ),
      organization: increment(
        usersTable.organization,
        xpGrants.organization || 0,
      ),
      leadership: increment(usersTable.leadership, xpGrants.leadership || 0),
      timeManagement: increment(
        usersTable.timeManagement,
        xpGrants.timeManagement || 0,
      ),
      teamwork: increment(usersTable.teamwork, xpGrants.teamwork || 0),
      workEthic: increment(usersTable.workEthic, xpGrants.workEthic || 0),
      criminality: increment(usersTable.criminality, xpGrants.criminality || 0),
      reputation: increment(usersTable.reputation, xpGrants.reputation || 0),
    })
    .where(eq(usersTable.userId, user.userId))
    .returning();

  const embedList = [];

  const embed = getPersonalizedEmbed(interaction.user);
  embed.setDescription(fullMessage);
  embedList.push(embed);

  if (await checkForPromotion(newUser[0])) {
    embedList.push(
      new EmbedBuilder()
        .setTitle("Promotion Time!")
        .setDescription(
          "You have been promoted! Use `/job info` to check your new job details!",
        )
        .setColor(Color.GOLD),
    );
  }

  interaction.reply({
    embeds: embedList,
  });
};
