import { EmbedBuilder } from "discord.js";
import type { LifebotCommandHandler } from "../../../types/commandTypes";
import { generateHouse } from "./util/generateHouse";
import { Color } from "../../../utils/colors";

export const buy: LifebotCommandHandler = async ({ interaction }) => {
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
        `Furniture Score: ${house.furniture}/100`,
      ].join("\n"),
      inline: true,
    });
  }

  interaction.reply({ embeds: [embed] });
};
