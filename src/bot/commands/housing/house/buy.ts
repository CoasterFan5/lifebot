import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { generateHouse } from "./util/generateHouse";
import { Color } from "../../../utils/colors";
import { db } from "../../../../db";
import { housesTable, usersTable } from "../../../../db/schema";
import { increment } from "../../../../db/increment";

const SIXTY_SECONDS = 60_000;

const stringToIntMap: { [key: string]: number } = {
  "1": 0,
  "2": 1,
  "3": 2,
};

export const buy: LifebotCommandHandler = async ({ interaction, user }) => {
  const houses = [generateHouse(), generateHouse(), generateHouse()];

  const embed = new EmbedBuilder()
    .setTitle("House Shopping")
    .setDescription("We love housing.")
    .setColor(Color.BLUE);

  for (const [index, house] of houses.entries()) {
    embed.addFields({
      name: `House #${index + 1}`,
      value: [
        `Cost: $${house.value}`,
        `Location: ${house.location}/100`,
        `Size: ${house.squareFootage} Square Feet`,
        `Quality: ${house.quality}/100`,
        `Furniture Score: ${house.furnitureScore}/100`,
      ].join("\n"),
      inline: true,
    });
  }

  const actionRow = new ActionRowBuilder<ButtonBuilder>();

  const button1 = new ButtonBuilder()
    .setLabel("Buy House 1")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("1");
  const button2 = new ButtonBuilder()
    .setLabel("Buy House 2")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("2");
  const button3 = new ButtonBuilder()
    .setLabel("Buy House 3")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("3");

  actionRow.addComponents(button1, button2, button3);

  const response = await interaction.reply({
    embeds: [embed],
    components: [actionRow],
  });

  response
    .awaitMessageComponent({
      time: SIXTY_SECONDS,
      filter: async (i) => i.user.id === interaction.user.id,
    })
    .catch((e) => {
      embed.setColor(Color.RED);
      embed.setTitle("House Shopping (expired)");

      const newActionRow = new ActionRowBuilder<ButtonBuilder>();
      newActionRow.addComponents(
        button1.setDisabled(),
        button2.setDisabled(),
        button3.setDisabled(),
      );
      response.edit({
        embeds: [embed],
        components: [newActionRow],
      });
    })
    .then(async (newInteraction) => {
      if (newInteraction?.isButton()) {
        embed.setColor(Color.RED);
        embed.setTitle("House Shopping (expired)");

        const newActionRow = new ActionRowBuilder<ButtonBuilder>();
        newActionRow.addComponents(
          button1.setDisabled(),
          button2.setDisabled(),
          button3.setDisabled(),
        );
        response.edit({
          embeds: [embed],
          components: [newActionRow],
        });

        const selectedHouse = houses[stringToIntMap[newInteraction.customId]];

        if (selectedHouse.value > (user?.balance || 0)) {
          const poorEmbed = new EmbedBuilder()
            .setColor(Color.BLUE)
            .setTitle("Broke!")
            .setDescription(
              "Get your money up first. (You can't afford this house)",
            );

          newInteraction.reply({
            embeds: [poorEmbed],
          });
          return;
        }

        const newHouse = await db
          .insert(housesTable)
          .values({
            location: selectedHouse.location,
            quality: selectedHouse.quality,
            squareFootage: selectedHouse.squareFootage,
            furnitureScore: selectedHouse.furnitureScore,
            ownerId: user.userId,
          })
          .returning();

        await db.update(usersTable).set({
          balance: increment(usersTable.balance, -selectedHouse.value),
        });

        const congratsEmbed = new EmbedBuilder()
          .setTitle("Congrats!")
          .setColor(Color.BLUE)
          .setDescription(
            `You purchased a house, view your house info with \`/house info ${newHouse[0]?.id}\``,
          );

        newInteraction.reply({
          embeds: [congratsEmbed],
        });
      }
    });
};
