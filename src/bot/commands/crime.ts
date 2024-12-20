import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { badCrimes, goodCrime } from "../textBank/crime";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
import { getPersonalizedEmbed } from "../utils/personalizedEmbed";
import { eq } from "drizzle-orm";

const COOLDOWN = 60_000; // ms

export const crime: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Do crime. What could go wrong?"),
  handler: async (interaction, user) => {
    const msSinceLastCrime = Date.now() - (user.lastCrime?.getTime() || 0);
    if (msSinceLastCrime < COOLDOWN) {
      const timeLeft = Math.ceil((COOLDOWN - msSinceLastCrime) / 1000);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Slow down!")
            .setDescription(`You can do crime again in ${timeLeft} seconds`)
            .setColor(Color.RED),
        ],
      });
      return;
    }

    const isGood = Math.random() > 0.45;
    const multiplier = isGood ? 1 : -1;
    const amount = (Math.floor(Math.random() * 1000) + 1000) * multiplier;
    const messageList = isGood ? goodCrime : badCrimes;
    const messageIndex = Math.floor(Math.random() * messageList.length);
    const message = messageList[messageIndex].replaceAll(
      "{}",
      `$${Math.abs(amount)}`,
    );

    await db
      .update(usersTable)
      .set({
        balance: (user.balance || 0) + amount,
        lastCrime: new Date(),
      })
      .where(eq(usersTable.userId, user.userId));

    interaction.reply({
      embeds: [
        getPersonalizedEmbed(interaction.user)
          .setDescription(message)
          .setColor(isGood ? Color.GREEN : Color.RED)
          .setFooter({
            text: `Mid: ${messageIndex}`,
          }),
      ],
    });
  },
};
