import {db} from "../db";
import { usersTable, userItemsTable, itemsTable} from "../db/schema";
import {LifebotCommand} from "../types/commandTypes";
import {Color} from "../utils/colors";
import {EmbedBuilder, SlashCommandBuilder, SlashCommandNumberOption} from "discord.js";
import {eq, and} from "drizzle-orm";

export const inventory: LifebotCommand = {
    command: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View your inventory")
        .addNumberOption(
            new SlashCommandNumberOption()
                .setName("page")
                .setDescription("The page number of your inventory")
                .setRequired(false),
        ),
    handler: async (interaction, user) => {
        let page = interaction.options.getNumber("page") || 0;

        const items = await db
            .select({
                itemId: userItemsTable.itemId,
                itemName: itemsTable.itemName,
                itemDescription: itemsTable.itemDescription,
                itemPrice: itemsTable.price,
                itemQuantity: userItemsTable.quantity,
            })
            .from(userItemsTable)
            .where(eq(userItemsTable.userId, user.userId))
            .leftJoin(itemsTable, eq(userItemsTable.itemId, itemsTable.id))
            .limit(20)
            .offset(page * 20)
            .execute();
        console.log(items);
        let embed;
        if (items.length === 0) {
            embed = new EmbedBuilder()
            .setTitle("Your Invintory")
            .setColor(Color.RED)
            .setDescription("You don't have any items. :(");
        } else {
            embed = new EmbedBuilder()
            .setTitle("Your Invintory")
            .setColor(Color.GREEN)
            .setDescription("Here are your items: \n")
            .addFields(
                items.map(item => ({
                name: `${item.itemName}`,
                value: `ID: ${item.itemId}\nDescription: ${item.itemDescription}\nPrice: $${item.itemPrice}\nQuantity: ${item.itemQuantity}\n`,
                }))
            );
        }
        await interaction.reply({ embeds: [embed] });
    }
};
