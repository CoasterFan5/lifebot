import { SlashCommandBuilder } from "discord.js";
import type { LifebotCommand } from "../types/commandTypes";
import { getPersonalizedEmbed } from "../utils/personalizedEmbed";

export const skills: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("skills")
    .setDescription("Check skill xp"),
  handler: async ({ interaction, user, client }) => {
    const skillsEmbed = getPersonalizedEmbed(interaction.user);

    skillsEmbed.setDescription(`
Technical Skills: ${user.technicalSkills}xp
Creativity: ${user.creativity}xp
Customer Service: ${user.customerService}xp
Organization: ${user.organization}xp
Leadership: ${user.leadership}xp
Time Management: ${user.timeManagement}xp
Teamwork: ${user.teamwork}xp
Work Ethic: ${user.workEthic}xp
Criminality: ${user.criminality}xp
Reputation: ${user.reputation}xp
`);

    interaction.reply({
      embeds: [skillsEmbed],
    });
  },
};
