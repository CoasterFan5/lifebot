import { EmbedBuilder } from "discord.js";
import { and, eq, isNull, lt, or, sql } from "drizzle-orm";
import { db } from "../../../../db";
import { increment } from "../../../../db/increment";
import { housesTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import { noHouseFoundEmbed } from "./util/noHouseEmbed";

const ONE_HOUR = 60 * 60 * 1000;

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

	const moveOuts: number[] = [];
	const moveoutPromises: Promise<unknown>[] = [];

	if (homes.length < 1) {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle("No house ready")
					.setDescription("No houses are ready with rent.")
					.setColor(Color.RED),
			],
		});
		return;
	}

	for (const house of homes) {
		totalCollected += house.rentPrice;
		if (house.tenanteWealth < 0) {
			moveOuts.push(house.id);
			moveoutPromises.push(
				db
					.update(housesTable)
					.set({
						leased: false,
					})
					.where(eq(housesTable.id, house.id)),
			);
		}
	}

	const collectedEmbed = new EmbedBuilder()
		.setTitle("Rent Collected")
		.setDescription(
			`You collected $${nFormat(totalCollected)} from ${homes.length} homes`,
		)
		.setColor(Color.BLUE);

	await Promise.all(moveoutPromises);

	const embedList = [collectedEmbed];
	if (moveOuts.length > 0) {
		embedList.push(
			new EmbedBuilder().setTitle("Uh oh").setDescription(
				moveOuts
					.map((item) => {
						return `A tenant moved out of house ${item} because it was too expensive!`;
					})
					.join("\n"),
			),
		);
	}

	await db
		.update(usersTable)
		.set({
			balance: increment(usersTable.balance, totalCollected),
		})
		.where(eq(usersTable.userId, user.userId));

	interaction.reply({
		embeds: embedList,
	});
};
