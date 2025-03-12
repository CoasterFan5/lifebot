import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { furnitureTable, housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { noFurnitureEmbed } from "./utils";
import { increment } from "../../../../db/increment";
import {
  calculateFurnitureScore,
  type FurnitureItem,
} from "./furnitureCalculations";
import { EmbedBuilder } from "discord.js";

export const reclaim: LifebotCommandHandler = async ({ interaction, user }) => {
  const furnitureId = interaction.options.getInteger("id", true);

  const furnitureList = await db
    .select()
    .from(furnitureTable)
    .where(
      and(
        eq(furnitureTable.id, furnitureId),
        eq(furnitureTable.ownerId, user.userId),
      ),
    );

  if (furnitureList.length < 1) {
    interaction.reply({
      embeds: [noFurnitureEmbed],
    });
  }

  const furnitureItem = furnitureList[0] as FurnitureItem;

  if (furnitureList[0].houseId) {
    await db.update(housesTable).set({
      furnitureScore: increment(
        housesTable.furnitureScore,
        calculateFurnitureScore(furnitureItem),
      ),
    });

    await db
      .update(furnitureTable)
      .set({
        houseId: null,
      })
      .where(eq(furnitureTable.id, furnitureId));
  }

  const reclaimedMessage = new EmbedBuilder()
    .setTitle("Furniture Removed")
    .setDescription(
      `${furnitureItem.material} ${furnitureItem.type} has been removed from any homes it was assigned to.`,
    );

  interaction.reply({
    embeds: [reclaimedMessage],
  });
};
