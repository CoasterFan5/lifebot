import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { petsTable, userPetsTable } from "../../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color, randomBritghtColor } from "../utils/colors";

export const pets: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("pets")
    .setDescription("View and care for your pets!"),
  handler: async ({ interaction }) => {
    const pets = await db
      .select({
        petId: userPetsTable.petId,
        petName: petsTable.petName,
        species: petsTable.species,
        age: petsTable.age,
        mood: petsTable.mood,
        hungry: petsTable.hungry,
        lastFed: petsTable.lastFed,
        lastPlayed: petsTable.lastPlayed,
        lastPet: petsTable.lastPet,
      })
      .from(userPetsTable)
      .innerJoin(petsTable, eq(userPetsTable.petId, petsTable.id))
      .where(eq(userPetsTable.userId, interaction.user.id))
      .limit(20)
      .execute();
    console.log(pets);
    let embed: EmbedBuilder;
    if (pets.length === 0) {
      embed = new EmbedBuilder()
        .setTitle("Your Pets")
        .setColor(Color.RED)
        .setDescription("You don't have any pets.");
    } else {
      embed = new EmbedBuilder()
        .setTitle("Your Pets")
        .setColor(randomBritghtColor())
        .setDescription("Here are your pets: \n")
        .addFields(
          pets.map((pet) => ({
            name: `${pet.petName} :${pet.species.toLowerCase()}:`,
            value: `ID: ${pet.petId}\nAge: ${pet.age}\nMood: ${pet.mood}\nHungry: ${pet.hungry}%\nLast Fed: ${pet.lastFed}\nLast Played: ${pet.lastPlayed}\nLast Pet: ${pet.lastPet}\n`,
          })),
        );
    }
    await interaction.reply({ embeds: [embed] });
  },
};
