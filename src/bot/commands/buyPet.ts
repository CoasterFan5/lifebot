import {
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandNumberOption,
} from "discord.js";
import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { petsTable, userPetsTable, usersTable } from "../../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";

export const buypet: LifebotCommand = {
  command: new SlashCommandBuilder()
    .setName("buypet")
    .setDescription("Buy a pet from the pet store")
    .addNumberOption(
      new SlashCommandNumberOption()
        .setName("petid")
        .setDescription("The ID of the pet to buy")
        .setRequired(true),
    ),
  handler: async ({ interaction, user }) => {
    const requestedPetId = interaction.options.getNumber("petid", true);

    const [pet] = await db
      .select({
        id: petsTable.id,
        petName: petsTable.petName,
        species: petsTable.species,
        price: petsTable.price,
        isSold: petsTable.isSold,
      })
      .from(petsTable)
      .where(and(eq(petsTable.id, requestedPetId), eq(petsTable.isSold, false)))
      .limit(1)
      .execute();

    if (!pet) {
      const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setTitle("Pet not found")
        .setDescription("This Pet could not be found in the store.");

      await interaction.reply({ embeds: [embed] });
      return;
    }

    const userBalace = user.balance || 0;
    const petPrice = pet ? Math.ceil(Number(pet.price)) : 0;

    if (userBalace < petPrice) {
      const embed = new EmbedBuilder()
        .setColor(Color.RED)
        .setTitle("Insufficient funds")
        .setDescription("You do not have enough money to buy this pet.");

      await interaction.reply({ embeds: [embed] });
      return;
    }

    await db
      .update(usersTable)
      .set({
        balance: userBalace - petPrice,
      })
      .where(eq(usersTable.userId, user.userId))
      .execute();

    await db
      .update(petsTable)
      .set({
        isSold: true,
      })
      .where(eq(petsTable.id, requestedPetId))
      .execute();

    await db
      .insert(userPetsTable)
      .values({
        id: Math.floor(Math.random() * 1000000), // or use a proper ID generation method
        userId: user.userId,
        petId: requestedPetId,
      })
      .execute();

    const embed = new EmbedBuilder()
      .setColor(Color.GREEN)
      .setTitle("Pet purchased")
      .setDescription(
        `You have successfully purchased ${pet.petName} for ${pet.price}`,
      );

    await interaction.reply({ embeds: [embed] });
  },
};
