import { count, eq, gt } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import {
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandUserOption,
} from "discord.js";
import { Color } from "../utils/colors";

export const rank: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("View global ranking.")
    .addUserOption(
      new SlashCommandUserOption()
        .setName("user")
        .setDescription("See another user's rank"),
    ),
  handler: async (interaction, user, client) => {
    const otherUser = interaction.options.getUser("user", false);
    let userToCheck = user;

    if (otherUser) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, otherUser.id));
      if (!dbUser[0]) {
        interaction.reply("This user is not ranked.");
        return;
      }
      if (dbUser[0]) {
        userToCheck = dbUser[0];
      }
    }

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
      .where(gt(usersTable.balance, userToCheck.balance || 0));

    const rankString = `${aboveThisUser[0].count + 1}/${totalUsers[0].count}`;

    if (otherUser) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${otherUser.displayName}'s rank`)
            .setDescription(`${otherUser.displayName} is ranked ${rankString}`)
            .setColor(Color.GREEN),
        ],
      });
      return;
    }
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Rank")
          .setDescription(`You are ranked ${rankString}`)
          .setColor(Color.GREEN),
      ],
    });
  },
};
