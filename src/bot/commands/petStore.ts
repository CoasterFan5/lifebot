import {
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	SlashCommandUserOption,
	ActionRowBuilder,
	ButtonBuilder,
} from "discord.js";
import { eq, lt, sql } from "drizzle-orm";
import { db } from "../../db";
import { petsTable, usersTable } from "../../db/schema";
import type { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
import { petnames, species } from "../textBank/petText";

export const petstore: LifebotCommand = {
	command: new SlashCommandBuilder()
		.setName("petstore")
		.setDescription("View the pet store"),
	handler: async (interaction,user) => {
		const pets = await genPets();

		const row = new ActionRowBuilder<ButtonBuilder>()

		const embed = new EmbedBuilder()
			.setTitle("Pet Store")
			.setColor(Color.GREEN)
			

		let petNum = 1;
		for (let pet of pets) {
			embed.addFields({
				name: `${pet.petname}  ${pet.species}`,
				value: `Price: ${pet.price}\nLevel: ${pet.level}\nRarity: ${pet.rarity}`,
				inline: false,
			});

			row.addComponents(
				new ButtonBuilder()
					.setCustomId(`buy_pet_${petNum}`)
					.setLabel(`Buy pet # ${petNum++}`)
					.setStyle(1) // You need to set a style for the button
			);
		}

			const sent = await interaction.reply({ embeds: [embed], components: [row] });

			try{
				sent
				.awaitMessageComponent({
					filter: (i) => i.isButton() && i.user.id === interaction.user.id,
					time: 60_000,
				})
				.catch((e) => {
					interaction.editReply({ content: "Time's up!", components: [] });
				})
				.then(async (i) => {
					if (!i || !i.isButton()) {
						console.log("Exiting Early");
						return;
					}
					const petNum = Number(i.customId.split("_")[2]);
					console.log(`Buying pet #${petNum}`);
					let pet = pets[petNum - 1];

					// Buy the pet
					if (user.balance === null || user.balance < pet.price) {
						await interaction.editReply({ content: "You don't have enough money to buy this pet", components: [] });
						return;
					}

					await db
						.update(usersTable)
						.set({
							balance: sql`${usersTable.balance} - ${pet.price}`,
						})
						.where(eq(usersTable.userId, user.userId));

					await db
						.insert(petsTable)
						.values({
							id: sql`DEFAULT`,
							ownerId: user.userId,
							petName: pet.petname,
							species: pet.species,
							level: Number(pet.level),
							rarity: Number(pet.rarity),
						})
						.execute();
					await interaction.editReply({ content: `You bought pet #${petNum}`, components: [] });
				}
				);
			} catch (err) {
				console.error(err);
			}
		}
	};

	
				


const genPets = async () => {
	let pets = [];
	for (let i = 0; i < 5; i++) {
		let pet = {
			petname: petnames[Math.floor(Math.random() * petnames.length)], 
			species: species[Math.floor(Math.random() * species.length)], 
			level: Math.floor(Math.random() * (30 - 1 + 1)) + 1, 
			price: Math.floor(Math.random() * (1999 - 100 + 1)) + 100, 
			
			rarity: 1
		};
		pets.push(pet);
	}
	return pets;
};

