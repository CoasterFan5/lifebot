import {
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandUserOption,
} from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
import { getPersonalizedEmbed } from "../utils/personalizedEmbed";

export const balance: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance")
    .addUserOption(
      new SlashCommandUserOption()
        .setName("user")
        .setDescription("Check the balance of another users")
        .setRequired(false),
    ),
  handler: async (interaction, user) => {
    const isNotAuthor = interaction.options.getUser("user", false) != null;

    const realUser =
      interaction.options.getUser("user", false) || interaction.user;

    const embed = getPersonalizedEmbed(realUser).setColor(Color.GREEN);

    if (isNotAuthor) {
      const otherDbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, realUser.id));
      let bal = 0;
      if (otherDbUser.length > 0 && otherDbUser[0].balance) {
        bal = otherDbUser[0].balance;
      }
      embed.setDescription(`${realUser.displayName} has $${bal}`);
    } else {
      embed.setDescription(`You have $${user.balance}`);
    }

    interaction.reply({
      embeds: [embed],
    });
  },
};
