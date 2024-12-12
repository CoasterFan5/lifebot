import {db} from "../db";
import {petsTable, userPetsTable, usersTable, userItemTable} from "../db/schema";
import {LifebotCommand} from "../types/commandTypes";
import {Color} from "../utils/colors";
import {EmbedBuilder, SlashCommandBuilder, SlashCommandNumberOption} from "discord.js";
import {eq, and} from "drizzle-orm";

