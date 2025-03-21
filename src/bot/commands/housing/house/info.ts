import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type CacheType,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	type InteractionReplyOptions,
	type MessagePayload,
} from "discord.js";
import { $Type, and, count, desc, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { Color } from "../../../utils/colors";
import { nFormat } from "../../../utils/nFormat";
import { calculateHouseValue } from "./util/calculateHouseValue";

const getHousesEmbedsWithPages = async ({
	page,
	perPage = 5,
	interaction,
	houseId,
	userId,
}: {
	page: number;
	perPage?: number;
	interaction: ChatInputCommandInteraction<CacheType>;
	houseId: number | null;
	userId: string;
}) => {
	let totalRecords = 0;
	if (houseId) {
		totalRecords = 1;
	} else {
		totalRecords = (
			await db
				.select({
					count: count(),
				})
				.from(housesTable)
				.where(eq(housesTable.ownerId, userId))
		)[0].count;
	}

	const pages = Math.ceil(totalRecords / perPage);

	let houses: (typeof housesTable.$inferSelect)[];

	if (houseId) {
		houses = await db
			.select()
			.from(housesTable)
			.where(and(eq(housesTable.ownerId, userId), eq(housesTable.id, houseId)));
	} else {
		houses = await db
			.select()
			.from(housesTable)
			.where(eq(housesTable.ownerId, userId))
			.limit(perPage)
			.offset((page - 1) * perPage);
	}

	if (houses.length === 0) {
		return {
			embedList: [
				new EmbedBuilder()
					.setColor(Color.BLUE)
					.setTitle("You are homeless.")
					.setDescription(
						"Talk to me when you have a house. \n (PS, use `/house buy`)",
					),
			],
			hasNextPage: false,
			hasPreviousPage: false,
		};
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
					`Furniture Score: ${house.furnitureScore.toFixed(2)}/100`,
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

	return {
		embedList,
		hasPreviousPage: page > 1,
		hasNextPage: page < Math.ceil(totalRecords / perPage),
	};
};

const getMessage = ({
	embedList,
	hasNextPage,
	hasPreviousPage,
}: Awaited<ReturnType<typeof getHousesEmbedsWithPages>>) => {
	const buttons = new ActionRowBuilder<ButtonBuilder>();

	const previousButton = new ButtonBuilder()
		.setStyle(ButtonStyle.Secondary)
		.setCustomId("prev")
		.setLabel("Previous Page");
	const nextButton = new ButtonBuilder()
		.setStyle(ButtonStyle.Secondary)
		.setCustomId("next")
		.setLabel("Next Page");

	if (!hasPreviousPage) {
		previousButton.setDisabled(true);
	}
	if (!hasNextPage) {
		nextButton.setDisabled(true);
	}

	buttons.addComponents(previousButton, nextButton);

	return {
		embeds: embedList as EmbedBuilder[],
		components: [buttons],
		ephemeral: true,
	};
};

export const info: LifebotCommandHandler = async ({ interaction, user }) => {
	const houseId = interaction.options.getInteger("id", false);
	let page = 1;

	const housesMessageData = await getHousesEmbedsWithPages({
		page: page,
		interaction,
		userId: user.userId,
		houseId,
	});

	const infoMessage = await interaction.reply(getMessage(housesMessageData));

	const addListener = () => {
		infoMessage
			.awaitMessageComponent({
				filter: (i) => i.user.id === user.userId,
				time: 60_000,
			})
			.then(async (newI) => {
				if (newI.customId === "prev") {
					page -= 1;
				}
				if (newI.customId === "next") {
					page += 1;
				}

				const housesMessageData = await getHousesEmbedsWithPages({
					page: page,
					interaction,
					userId: user.userId,
					houseId,
				});

				infoMessage.edit(getMessage(housesMessageData));
				newI.deferUpdate();
				addListener();
			})
			.catch((e) => {
				try {
					infoMessage.delete();
				} catch (e) {
					console.warn(e);
				}
			});
	};
	addListener();
};
