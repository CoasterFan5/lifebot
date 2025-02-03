import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { Color } from "../../../utils/colors";
import { calculateHouseValue } from "./util/calculateHouseValue";
import { nFormat } from "../../../utils/nFormat";
import { increment } from "../../../../db/increment";

const noHouseFoundEmbed = new EmbedBuilder()
  .setTitle("You must be confused")
  .setDescription("You do not own a house with this id...")
  .setFooter({
    text: "Tip: Use /house info to see homes you own",
  })
  .setColor(Color.BLUE);

export const sell: LifebotCommandHandler = async ({ interaction, user }) => {
  const houseId = interaction.options.getInteger("id", true);

  const houseList = await db
    .select()
    .from(housesTable)
    .where(
      and(eq(housesTable.ownerId, user.userId), eq(housesTable.id, houseId)),
    );

  if (houseList.length < 1) {
    interaction.reply({
      embeds: [noHouseFoundEmbed],
    });
  }

  const house = houseList[0];

  const sellValue = calculateHouseValue(house);

  const confirmEmbed = new EmbedBuilder()
    .setTitle("Are you sure?")
    .setDescription(
      `Are you sure you want to sell this house for $${nFormat(sellValue)}`,
    )
    .setColor(Color.BLUE);

  const confirmActionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Confirm")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("b"),
  );

  const reply = await interaction.reply({
    embeds: [confirmEmbed],
    components: [confirmActionRow],
  });

  reply
    .awaitMessageComponent({
      time: 60_000,
      filter: (i) => i.user.id === user.userId,
    })
    .then(async (newInteraction) => {
      //sell the house
      await db
        .update(usersTable)
        .set({
          balance: increment(usersTable.balance, sellValue),
        })
        .where(eq(usersTable.userId, user.userId));

      await db.delete(housesTable).where(eq(housesTable.id, house.id));

      if (newInteraction.isRepliable()) {
        const soldEmbed = new EmbedBuilder()
          .setTitle("House sold.")
          .setDescription("Bye bye.")
          .setColor(Color.BLUE);
        newInteraction.reply({
          embeds: [soldEmbed],
        });
      }
    })
    .catch((e) => {});
};
