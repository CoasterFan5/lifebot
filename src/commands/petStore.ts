import {
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandUserOption,
 EmbedBuilder } from "discord.js";
import { LifebotCommand } from '../types/commandTypes';
import { db } from '../db';
import { petsTable } from '../db/schema';
import { Color } from "../utils/colors";

export const petStore: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName('petstore')
    .setDescription('View the pet store'),
    handler: async (interaction, user) => {
      const embed = new EmbedBuilder()
        .setTitle("Balance")
        .setColor(Color.GREEN)
        .setDescription(`You have $${user.balance?.toString()}!`);
  
      interaction.reply({
        embeds: [embed],
      });
    // Add your code here
    // let query = 'Select petName, species, age, price from pets where isSold = false';
    // let results = await db
    //     .select({
    //       petName: petsTable.petName,
    //       species: petsTable.species,
    //       age: petsTable.age,
    //       price: petsTable.price
    //     })
    //     .from(petsTable)
    //     // .where(petsTable.isSold.eq(false))
    //     .limit(10)
    //     .execute();
    //   const embed = new EmbedBuilder()
    //     .setTitle("Pet Store")
    //     // .setColor(Color.RED)
    //     .setDescription(`Here are the pets available for sale: \n\n${results.map(pet => `${pet.petName} (${pet.species}), Age: ${pet.age}, Price: ${pet.price}`).join('\n')}`);

    //   interaction.reply({
    //     embeds: [embed],
    // });

  },
};