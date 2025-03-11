import { EmbedBuilder } from "discord.js";
import { $Type, and, desc, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import { calculateHouseValue } from "./util/calculateHouseValue";

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
		const houseInfoEmbed = new EmbedBuilder()
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
			);

		if (house.leased) {
			const lastRent = house.lastRentCollection;
			const lastRentString = lastRent
				? `<t:${Math.floor(lastRent.getTime() / 1000)}:R>`
				: "Never";

			houseInfoEmbed.addFields({
				name: "Tenant Info",
				value: [
					`Rent Amount: $${nFormat(house.rentPrice)}`,
					`Last Rent Collection: ${lastRentString}`,
					`Tenant Quality: ${house.tenantScore}/5`,
				].join("\n"),
			});
		}

		embedList.push(houseInfoEmbed);
	}

	interaction.reply({
		embeds: embedList,
	});
};
