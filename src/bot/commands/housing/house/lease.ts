import { and, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { housesTable } from "../../../../db/schema";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { noHouseFoundEmbed } from "./util/noHouseEmbed";
import { generateTenantInfo } from "./util/generateTenantInfo";
import { generateHouse } from "./util/generateHouse";
import { calculateHouseValue } from "./util/calculateHouseValue";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { Color } from "../../../utils/colors";
import { randomName } from "../../../textBank/humanNames";
import { nFormat } from "../../../utils/nFormat";

export const lease: LifebotCommandHandler = async ({ interaction, user }) => {
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

  const house = houseList[0];

  if (house.leased) {
    const alreadyLeasedEmbed = new EmbedBuilder()
      .setTitle("Already leased")
      .setDescription(
        "As much as I love the idea of torturing tenants with forced double occupancy, that's not a feature of this bot... yet.",
      )
      .setColor(Color.BLUE);

    interaction.reply({
      embeds: [alreadyLeasedEmbed],
    });

    return;
  }

  const houseValue = calculateHouseValue(house);
  const possibleTenant = generateTenantInfo({
    houseValue,
  });
  const tenantName = randomName();

  const tenantInfoEmbed = new EmbedBuilder()
    .setColor(Color.BLUE)
    .setTitle("Tenant Approval")
    .setDescription(
      [
        `Name: ${tenantName.firstName} ${tenantName.lastName}`,
        `Rent Payment: $${nFormat(possibleTenant.rentPayment)}`,
        `Score: ${possibleTenant.score}/5`,
      ].join("\n"),
    );

  const tenantOptions = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Approve")
      .setStyle(ButtonStyle.Success)
      .setCustomId("approve"),
    new ButtonBuilder()
      .setLabel("Deny")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("deny"),
  );

  const interactionResponse = await interaction.reply({
    embeds: [tenantInfoEmbed],
    components: [tenantOptions],
  });

  interactionResponse
    .awaitMessageComponent({
      time: 60_000,
      filter: (i) => i.user.id === user.userId,
    })
    .then(async (newInteraction) => {
      if (newInteraction.isButton()) {
        newInteraction.deferUpdate();

        if (newInteraction.customId !== "approve") {
          tenantInfoEmbed.setTitle("Denied!");
          tenantInfoEmbed.setColor(Color.RED);
          interactionResponse.edit({
            embeds: [tenantInfoEmbed],
            components: [],
          });
          return;
        }

        await db
          .update(housesTable)
          .set({
            leased: true,
            rentPrice: possibleTenant.rentPayment,
            tenantScore: possibleTenant.score,
            tenanteWealth: possibleTenant.wealth,
          })
          .where(eq(housesTable.id, house.id));

        tenantInfoEmbed.setTitle("Approved!");
        tenantInfoEmbed.setColor(Color.GREEN);

        interactionResponse.edit({
          embeds: [tenantInfoEmbed],
          components: [],
        });
      }
    })
    .catch((e) => {
      try {
        const disabledTenantOptions =
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setLabel("Approve")
              .setStyle(ButtonStyle.Success)
              .setCustomId("approve")
              .setDisabled(true),
            new ButtonBuilder()
              .setLabel("Deny")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("deny")
              .setDisabled(true),
          );
        interactionResponse.edit({
          components: [disabledTenantOptions],
        });
      } catch (e) {
        console.log(`Could not edit message in leaseApproval.  ${e} `);
      }
    });
};
