import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { LifebotCommand } from "../types/commandTypes";
import { Colors } from "../utils/colors";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { workMessages } from "../textBank/work";

const WORK_COOLDOWN = 60_000; // ms in work cooldown

export const work: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Do a job to earn money!"),
  handler: async (interaction, user) => {
    const currentTime = Date.now();

    if (
      user.lastWork &&
      currentTime - WORK_COOLDOWN < user.lastWork?.getTime()
    ) {
      const timeToWork = Math.ceil(
        (WORK_COOLDOWN - (currentTime - user.lastWork.getTime())) / 1000,
      );
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.RED)
            .setTitle("Calm down!")
            .setDescription(`You can work again in ${timeToWork} seconds`),
        ],
      });
      return;
    }

    const amount = Math.floor(Math.random() * 900) + 100;
    await db
      .update(usersTable)
      .set({ balance: amount + (user.balance || 0), lastWork: new Date() })
      .where(eq(usersTable.userId, user.userId));

    const message = workMessages[
      Math.floor(Math.random() * workMessages.length)
    ].replaceAll("{}", `$${amount}`);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.GREEN)
          .setDescription(message)
          .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL(),
          }),
      ],
    });
  },
};
