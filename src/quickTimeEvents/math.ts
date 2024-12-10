import { EmbedBuilder } from "discord.js";
import { QuickTimeEvent } from "../types/quickTimeEventFunction";
import { Color } from "../utils/colors";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { sql } from "drizzle-orm";

const symbols: { symbol: string; func: (n1: number, n2: number) => number }[] =
  [
    {
      symbol: "+",
      func: (n1, n2) => n1 + n2,
    },
    {
      symbol: "-",
      func: (n1, n2) => n1 - n2,
    },
    {
      symbol: "*",
      func: (n1, n2) => n1 * n2,
    },
    {
      symbol: "modulo",
      func: (n1, n2) => n1 % n2,
    },
  ];

export const mathEvent: QuickTimeEvent = async (message) => {
  const number1 = Math.ceil(Math.random() * 100);
  const number2 = Math.ceil(Math.random() * 100);

  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const result = symbol.func(number1, number2);

  const prize = Math.ceil(Math.random() * 5) * 500;

  const embed = new EmbedBuilder()
    .setTitle("Math!")
    .setDescription(
      `Be the first to solve \`${number1} ${symbol.symbol} ${number2}\` for a prize!`,
    )
    .setColor(Color.PURPLE);

  const question = await message.channel.send({
    embeds: [embed],
  });

  message.channel
    .awaitMessages({
      time: 15_000,
      filter: (m) => m.content.includes(result.toString()),
      max: 1,
      errors: ["time"],
    })
    .then(async (collected) => {
      const author = collected.first()?.author;

      if (!author) {
        return;
      }

      await db
        .insert(usersTable)
        .values({
          userId: author.id,
          balance: prize,
        })
        .onConflictDoUpdate({
          target: usersTable.userId,
          set: {
            userId: author.id,
            balance: sql`${usersTable.balance} + ${prize}`,
          },
        });

      collected.first()?.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Correct!")
            .setDescription(
              `You earned $${prize} for getting the correct answer`,
            )
            .setColor(Color.PURPLE),
        ],
      });
    })
    .catch(() => {
      question.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Out of time!")
            .setDescription(`The correct answer was ${result}`)
            .setColor(Color.PURPLE),
        ],
      });
    });
};
