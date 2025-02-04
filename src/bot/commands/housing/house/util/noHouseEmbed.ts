import { EmbedBuilder } from "discord.js";
import { Color } from "../../../../utils/colors";

export const noHouseFoundEmbed = new EmbedBuilder()
  .setTitle("You must be confused")
  .setDescription("You do not own a house with this id...")
  .setFooter({
    text: "Tip: Use /house info to see homes you own",
  })
  .setColor(Color.BLUE);
