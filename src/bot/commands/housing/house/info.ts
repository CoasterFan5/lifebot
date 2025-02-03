import { $Type, and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { EmbedBuilder } from "discord.js";
import { Color } from "../../../utils/colors";
import { calculateHouseValue } from "./util/calculateHouseValue";
import { nFormat } from "../../../utils/nFormat";

export const info: LifebotCommandHandler = async ({ interaction, user }) => {
  const houseId = interaction.options.getInteger("id", false);

  let houses: (typeof housesTable.$inferSelect)[];

  if (houseId) {
    houses = await db
      .select()
      .from(housesTable)
      .where(
        and(eq(housesTable.ownerId, user.userId), eq(housesTable.id, houseId)),
      );
  } else {
    houses = await db
      .select()
      .from(housesTable)
      .where(eq(housesTable.ownerId, user.userId))
      .limit(10);
  }

  if (houses.length < 1) {
    const embed = new EmbedBuilder()
      .setColor(Color.BLUE)
      .setTitle("You are homeless.")
      .setDescription(
        "Talk to me when you have a house. \n (PS, use `/house buy`)",
      );

    interaction.reply({
      embeds: [embed],
    });
    return;
  }

  const embedList = new Array();
  for (const house of houses) {
    embedList.push(
      new EmbedBuilder()
        .setColor(Color.BLUE)
        .setTitle(`House id: ${house.id}`)
        .setDescription(
          [
            `Value: $${nFormat(calculateHouseValue(house))}`,
            `Size: ${house.squareFootage} square feet`,
            `Location: ${house.location}/100`,
            `Quality: ${house.quality}/100`,
            `Furniture Score: ${house.furnitureScore}/100`,
          ].join("\n"),
        ),
    );
  }

  interaction.reply({
    embeds: embedList,
  });
};
