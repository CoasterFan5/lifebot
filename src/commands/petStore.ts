import { SlashCommandBuilder } from '@discordjs/builders';
import { LifebotCommand } from '../types/commandTypes';
import { db } from '../db';

export const petStore: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName('petstore')
    .setDescription('View the pet store'),
  handler: async () => {
    // Add your code here
    let query = 'Select petName, species, age, price from pets where isSold = false';
    let results = await db
        .select("petName, species, age, price")
        .from('petsTable')
        .where('isSold', '=', false)
        .execute();
    console.log(results);
  },
};