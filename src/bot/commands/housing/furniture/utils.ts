import { EmbedBuilder } from "discord.js";
import { Color } from "../../../utils/colors";

export const noFurnitureEmbed = new EmbedBuilder()
  .setTitle("No Furniture")
  .setColor(Color.BLUE)
  .setDescription("Could not locate your furniture, maybe it does not exist?");
