import { EmbedBuilder } from "discord.js";
import { and, asc, count, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { furnitureTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import {
  type FurnitureItem,
  calculateFurniturePrice,
  calculateFurnitureScore,
} from "./furnitureCalculations";
import { noFurnitureEmbed } from "./utils";

export const info: LifebotCommandHandler = async ({ interaction, user }) => {
  const rawPage = interaction.options.getInteger("page", false) || 1;
  const itemId = interaction.options.getInteger("id", false);

  const totalRecords = await db
    .select({ count: count() })
    .from(furnitureTable)
    .where(
      and(
        eq(furnitureTable.ownerId, user.userId),
        itemId ? eq(furnitureTable.id, itemId) : undefined,
      ),
    );

  const totalPages = Math.ceil(totalRecords[0].count / 5);
  const page = Math.min(totalPages, Math.max(rawPage, 1)) - 1;

  const furnitureItems = await db
    .select()
    .from(furnitureTable)
    .where(
      and(
        eq(furnitureTable.ownerId, user.userId),
        itemId ? eq(furnitureTable.id, itemId) : undefined,
      ),
    )
    .orderBy(asc(furnitureTable.id))
    .limit(5)
    .offset(Math.max(0, page * 5));

  if (furnitureItems.length < 1) {
    interaction.reply({
      embeds: [noFurnitureEmbed],
    });
    return;
  }

  const embedList: EmbedBuilder[] = [];

  for (const f of furnitureItems) {
    const score = calculateFurnitureScore(f as FurnitureItem);

    const itemEmbed = new EmbedBuilder()
      .setTitle(`${f.material} ${f.type}`)
      .setColor(Color.BLUE);

    const bodyArray = [
      `Id: \`${f.id}\``,
      `Condition: ${f.condition}%`,
      `Age: ${f.age} years ${f.antique ? "(antique)" : ""}`,
      `Score: ${score.toFixed(2)}`,
      `Furniture Value: $${nFormat(calculateFurniturePrice(score, f.originalValue))}`,
    ];

    if (f.houseId) {
      bodyArray.push(`Assigned to house ${f.houseId}`);
      itemEmbed.setColor(Color.GRAY);
    }

    embedList.push(itemEmbed.setDescription(bodyArray.join("\n")));
  }

  interaction.reply({
    content: `Page ${page + 1}/${totalPages}`,
    embeds: embedList,
  });
};
