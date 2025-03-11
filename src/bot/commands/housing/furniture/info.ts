import { and, asc, count, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { furnitureTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { EmbedBuilder } from "discord.js";
import { Color } from "../../../utils/colors";
import {
  calculateFurniturePrice,
  calculateFurnitureScore,
  type FurnitureItem,
} from "./furnitureCalculations";
import { nFormat } from "../../../utils/nFormat";

const noFurnitureEmbed = new EmbedBuilder()
  .setTitle("No Furniture")
  .setColor(Color.BLUE)
  .setDescription("Could not locate your furniture, maybe it does not exist?");

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
  const page = Math.min(totalPages, Math.max(rawPage, 0)) - 1;

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
    .offset(page * 5);

  if (furnitureItems.length < 1) {
    interaction.reply({
      embeds: [noFurnitureEmbed],
    });
    return;
  }

  const embedList: EmbedBuilder[] = [];

  for (const f of furnitureItems) {
    const score = calculateFurnitureScore(f as FurnitureItem);

    embedList.push(
      new EmbedBuilder()
        .setTitle(`${f.material} ${f.type}`)
        .setDescription(
          [
            `Id: \`${f.id}\``,
            `Condition: ${f.condition}%`,
            `Age: ${f.age} years ${f.antique ? "(antique)" : ""}`,
            `Score: ${score.toFixed(2)}`,
            `Furniture Value: $${nFormat(calculateFurniturePrice(score, f.originalValue))}`,
          ].join("\n"),
        )
        .setColor(Color.BLUE),
    );
  }

  interaction.reply({
    content: `Page ${page + 1}/${totalPages}`,
    embeds: embedList,
  });
};
