import {
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandUserOption,
 EmbedBuilder } from "discord.js";
import { LifebotCommand } from '../types/commandTypes';
import { db } from '../db';
import { petsTable } from '../db/schema';
import { Color } from "../utils/colors";

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
          price: petsTable.price
        })
        .from(petsTable)
        // .where(petsTable.isSold.eq(false))
        .limit(10)
        .execute();
      console.log(results);
      const embed = new EmbedBuilder()
        .setTitle("Pet Store")
        .setColor(Color.GREEN)
        .setDescription(`Here are the pets available for sale: \n\n${results.map(pet => `ID: ${pet.id} ${pet.petName} (${pet.species}), Age: ${pet.age}, Price: ${pet.price}`).join('\n')}`);

      interaction.reply({
        embeds: [embed],
    });

  },
};