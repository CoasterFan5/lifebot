import { EmbedBuilder } from "discord.js";
import type { QuickTimeEvent } from "../types/quickTimeEventFunction";
import { randomWords } from "./textBank/wordList";
import { Color } from "../utils/colors";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { sql } from "drizzle-orm";

export const wordUnscrable: QuickTimeEvent = async (message) => {
  const word = randomWords[Math.floor(Math.random() * randomWords.length)];

  const letterList = word.split("");
  const shuffledLetterList = [];
  while (letterList.length > 0) {
    const letterIndex = Math.floor(Math.random() * letterList.length);
    shuffledLetterList.push(letterList[letterIndex]);
    letterList.splice(letterIndex, 1);
  }

  const shuffledWord = shuffledLetterList.join("");
  const questionEmbed = new EmbedBuilder()
    .setTitle("Word Scramble!")
    .setDescription(`First one to unscramble \`${shuffledWord}\` gets a prize!`)
    .setColor(Color.PURPLE)
    .setFooter({
      text: word,
    });

  const question = await message.channel.send({
    embeds: [questionEmbed],
  });

  message.channel
    .awaitMessages({
      filter: (m) => m.content.includes(word),
      time: 15_000,
      max: 1,
      errors: ["time"],
    })
    .then(async (collected) => {
      const m = collected.first();
      if (!m) {
        return;
      }

      await db
        .insert(usersTable)
        .values({
          userId: m.author.id,
          balance: 1000,
        })
        .onConflictDoUpdate({
          target: usersTable.userId,
          set: {
            userId: m.author.id,
            balance: sql`${usersTable.balance} + 1000`,
          },
        });

      await m.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Correct!")
            .setDescription("You earned $1000 for that great answer!")
            .setColor(Color.PURPLE),
        ],
      });
    })
    .catch((e) => {
      question.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Times Up!")
            .setDescription(`The word was \`${word}\``)
            .setColor(Color.PURPLE),
        ],
      });
    });
};
