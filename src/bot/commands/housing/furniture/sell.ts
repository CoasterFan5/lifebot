import { EmbedBuilder } from "discord.js";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { increment } from "../../../../db/increment";
import { furnitureTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import {
  type FurnitureItem,
  calculateFurniturePrice,
  calculateFurnitureScore,
} from "./furnitureCalculations";
import { noFurnitureEmbed } from "./utils";

export const sell: LifebotCommandHandler = async ({ interaction, user }) => {
  const itemId = interaction.options.getInteger("id", true);

  const furnitureItem = await db
    .select()
    .from(furnitureTable)
    .where(
      and(
        eq(furnitureTable.id, itemId),
        eq(furnitureTable.ownerId, user.userId),
      ),
    );

  if (furnitureItem.length !== 1) {
    interaction.reply({
      embeds: [noFurnitureEmbed],
    });
    return;
  }

  const realFurnitureItem = furnitureItem[0] as FurnitureItem;
  const sellValue = Math.floor(
    calculateFurniturePrice(
      calculateFurnitureScore(realFurnitureItem),
      realFurnitureItem.originalValue,
    ),
  );

  await db.transaction(async (t) => {
    await t
      .update(usersTable)
      .set({
        balance: increment(usersTable.balance, sellValue),
      })
      .where(eq(usersTable.userId, user.userId));

    await t
      .delete(furnitureTable)
      .where(eq(furnitureTable.id, furnitureItem[0].id));
  });

  const soldEmbed = new EmbedBuilder()
    .setTitle("Item Sold!")
    .setDescription(
      `Sold a ${realFurnitureItem.material} ${realFurnitureItem.type} for $${nFormat(sellValue)}`,
    )
    .setColor(Color.BLUE);

  await interaction.reply({
    embeds: [soldEmbed],
  });
};
