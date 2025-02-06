import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable, usersTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { noHouseFoundEmbed } from "./util/noHouseEmbed";
import { calculateHouseValue } from "./util/calculateHouseValue";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
} from "discord.js";
import { nFormat } from "../../../utils/nFormat";
import { Color } from "../../../utils/colors";
import { balance } from "../../balance";
import { increment } from "../../../../db/increment";

export const renovate: LifebotCommandHandler = async ({
  interaction,
  user,
}) => {
  const houseId = interaction.options.getInteger("id", true);

  const houseList = await db
    .select()
    .from(housesTable)
    .where(
      and(eq(housesTable.id, houseId), eq(housesTable.ownerId, user.userId)),
    );

  if (houseList.length < 1) {
    interaction.reply({
      embeds: [noHouseFoundEmbed],
    });
    return;
  }

  // find the cost for the house
  const house = houseList[0];
  const renovationCost = calculateHouseValue(house);
  const newValue = calculateHouseValue(house, {
    ignoreQuality: true,
  });

  if ((user.balance || 0) < renovationCost) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Brokie!")
          .setDescription(
            [
              `You can't afford to renovate this home.`,
              `You need $${nFormat(renovationCost)} to renovate!`,
            ].join("\n"),
          )
          .setColor(Color.BLUE),
      ],
    });
    return;
  }

  const confirmEmbed = new EmbedBuilder()
    .setTitle("Are you sure?")
    .setDescription(
      [
        `Are you sure you want to renovate this house for $${nFormat(renovationCost)}?`,
        `The house will be worth $${nFormat(newValue)} after renovations.`,
      ].join("\n"),
    )
    .setColor(Color.BLUE)
    .setFooter({
      text: "Message expires in 60 seconds.",
    });

  const confirmButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Confirm")
      .setStyle(ButtonStyle.Success)
      .setCustomId("confirm"),
  );

  const interactionRespose = await interaction.reply({
    embeds: [confirmEmbed],
    components: [confirmButton],
  });

  interactionRespose
    .awaitMessageComponent({
      componentType: ComponentType.Button,
      filter: (i) => i.user.id === user.userId,
      time: 60_000,
    })
    .then(async (newInteraction) => {
      if (newInteraction.isRepliable()) {
        await db
          .update(housesTable)
          .set({
            quality: 100,
          })
          .where(eq(housesTable.id, house.id));

        await db
          .update(usersTable)
          .set({
            balance: increment(usersTable.balance, -renovationCost),
          })
          .where(eq(usersTable.userId, user.userId));

        const renovatedEmbed = new EmbedBuilder()
          .setTitle("Nice!")
          .setDescription("Renovations complete!")
          .setColor(Color.BLUE);

        newInteraction.reply({
          embeds: [renovatedEmbed],
        });
      }
    })
    .catch((e) => {
      try {
        const newConfirmButton =
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setLabel("Confirm")
              .setStyle(ButtonStyle.Success)
              .setCustomId("confirm")
              .setDisabled(true),
          );

        interactionRespose.edit({
          embeds: [confirmEmbed.setTitle("Expired").setColor(Color.RED)],
          components: [newConfirmButton],
        });
      } catch (e) {}
    });
};
