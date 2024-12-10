import { sql } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { QuickTimeEvent } from "../types/quickTimeEventFunction";
import { EmbedBuilder } from "discord.js";
import { Color } from "../utils/colors";

export const randomMoney: QuickTimeEvent = async (message) => {
  const author = message.author;

  const amount = Math.floor(Math.random() * 9) * 100 + 100;

  await db
    .insert(usersTable)
    .values({
      userId: author.id,
      balance: amount,
    })
    .onConflictDoUpdate({
      target: usersTable.userId,
      set: {
        userId: author.id,
        balance: sql`${usersTable.balance} + ${amount}`,
      },
    });

  message.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("It's your lucky day!")
        .setDescription(`You found $${amount} on the ground!`)
        .setColor(Color.PURPLE),
    ],
  });
};
