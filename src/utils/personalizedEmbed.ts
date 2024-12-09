import { EmbedBuilder, User } from "discord.js";
import { Color } from "./colors";

export const getPersonalizedEmbed = (user: User) => {
  return new EmbedBuilder()
    .setAuthor({
      name: user.displayName,
      iconURL: user.displayAvatarURL(),
    })
    .setColor(Color.GREEN);
};
