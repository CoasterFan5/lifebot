import {
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandUserOption,
 EmbedBuilder } from "discord.js";
import { LifebotCommand } from '../types/commandTypes';
import { db } from '../db';
import { petsTable } from '../db/schema';
import { Color } from "../utils/colors";
import { eq, lt } from 'drizzle-orm';

export const petstore: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName('petstore')
    .setDescription('View the pet store'),
  handler: async (interaction) => {
    let query = 'Select petName, species, age, price from pets where isSold = false';
    let results = await db
        .select({
          id: petsTable.id,
          petName: petsTable.petName,
          species: petsTable.species,
          age: petsTable.age,
          price: petsTable.price,
          isSold: petsTable.isSold
        })
        .from(petsTable)
        .where(eq(petsTable.isSold, false))
        .limit(10)
        .execute();
      console.log(results);
      const embed = new EmbedBuilder()
        .setTitle("Pet Store")
        .setColor(Color.GREEN)
        
        .setDescription(`Here are the pets available for sale: \n`)
        .addFields(
          {name: "Pet Name", value: results.map((result) => result.petName).join("\n"), inline: true},
          {name: "Species", value: results.map((result) => result.species).join("\n"), inline: true},
          {name: "Price", value: results.map((result) => result.price).join("\n"), inline: true},
        )

      interaction.reply({
        embeds: [embed],
    });

  },
};