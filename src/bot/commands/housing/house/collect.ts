import { and, eq, isNull, lt, or, sql } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { noHouseFoundEmbed } from "./util/noHouseEmbed";

const ONE_HOUR = 0;

export const collect: LifebotCommandHandler = async ({ interaction, user }) => {
  let homes: (typeof housesTable.$inferSelect)[];

  const houseId = interaction.options.getInteger("id", false);

  homes = await db
    .update(housesTable)
    .set({
      lastRentCollection: new Date(),
      quality: sql`GREATEST(${housesTable.quality} - (5 - ${housesTable.tenantScore}), 0)`,
      tenanteWealth: sql`${housesTable.tenanteWealth} - ${housesTable.rentPrice}`,
    })
    .where(
      and(
        eq(housesTable.ownerId, user.userId),
        houseId ? eq(housesTable.id, houseId) : undefined,
        or(
          lt(housesTable.lastRentCollection, new Date(Date.now() - ONE_HOUR)),
          isNull(housesTable.lastRentCollection),
        ),
      ),
    )
    .returning();

  let totalCollected = 0;

  for (const house of homes) {
    totalCollected += house.rentPrice;
  }

  interaction.reply(totalCollected + JSON.stringify(homes));
};
