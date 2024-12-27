import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { increment } from "../../../db/increment";
import { usersTable } from "../../../db/schema";
import type { LifebotCommandHandler } from "../../types/commandTypes";
import { Color } from "../../utils/colors";
import { getPersonalizedEmbed } from "../../utils/personalizedEmbed";
import { jobPaths } from "./jobList";
import { checkForPromotion } from "./jobUtils/checkForPromotion";
import { workMessages } from "./textBank/textBank";

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
      lastWork: new Date(),
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

  const embedList: EmbedBuilder[] = [];

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

  // Anti-bot code
  const checkAntiBot = Math.random() < 1 / 15;

  if (!checkAntiBot) {
    //just reply with what we have
    await interaction.reply({
      embeds: embedList,
    });
    return;
  }

  const buttons = new ActionRowBuilder<ButtonBuilder>();

  buttons.addComponents(
    new ButtonBuilder()
      .setLabel("Join meeting!")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("joinMeeting"),
  );

  const emergencyMeetingText = jobPaths[
    user.jobPath
  ].emergencyMeetingText.replaceAll("{companyName}", user.jobCompany);

  embedList.push(
    new EmbedBuilder()
      .setTitle("Emergency Meeting!")
      .setDescription(emergencyMeetingText)
      .setFooter({
        text: "You have 90 seconds to click the button below.\nIf a technical bug results in failing this challenge, join our support server.",
      })
      .setColor(Color.ORANGE),
  );

  const sent = await interaction.reply({
    embeds: embedList,
    components: [buttons],
  });

  sent
    .awaitMessageComponent({
      filter: (interaction) => interaction.user.id === user.userId,
      time: 90_000,
    })
    .then((newInteraction) => {
      newInteraction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("That went well!")
            .setDescription("Seems like it was a very productive meeting.")
            .setColor(Color.GREEN),
        ],
      });
    })
    .catch(async (e) => {
      const lostMoney = Math.ceil((user.balance || 0) * 0.3);

      embedList.push(
        new EmbedBuilder()
          .setTitle("Um, you didn't go to the meeting")
          .setDescription("This is awkward.")
          .addFields({
            name: "Punishments",
            value: `-$${lostMoney}\nFired from job\nLaughed at`,
          })
          .setColor(Color.ORANGE),
      );

      await db
        .update(usersTable)
        .set({
          balance: increment(usersTable.balance, -lostMoney),
          hasJob: false,
        })
        .where(eq(usersTable.userId, user.userId));

      interaction.editReply({
        embeds: embedList,
        components: [],
      });
    });
};
