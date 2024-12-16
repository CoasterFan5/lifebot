import {
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandNumberOption,
} from "discord.js";
import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import {
	petsTable,
	userItemsTable,
	userPetsTable,
	usersTable,
} from "../../db/schema";
import { LifebotCommand } from "../types/commandTypes";
import { Color } from "../utils/colors";
