import { count, gt } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const rank: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("View global ranking."),
  handler: async (interaction, user, client) => {
    const totalUsers = await db
      .select({
        count: count(),
      })
      .from(usersTable);

    const aboveThisUser = await db
      .select({
        count: count(),
      })
      .from(usersTable)
      .where(gt(usersTable.balance, user.balance || 0));

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Rank")
          .setDescription(
            `You are rank ${aboveThisUser[0].count + 1}/${totalUsers[0].count}`,
          ),
      ],
    });
  },
};
