import {
	boolean,
	decimal,
	integer,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	userId: varchar({ length: 256 }).notNull().unique(),
	balance: integer(),
	lastWork: timestamp(),
	lastCrime: timestamp(),
	// lastQuickEvent: timestamp(),
});

export const petsTable = pgTable("pets", {
	id: integer().notNull().unique(),
	ownerId: varchar({ length: 256 }),
	petName: varchar({ length: 256 }).notNull(),
	species: varchar({ length: 256 }).notNull(), //Cat, Dog, etc.
	age: decimal(),
	price: decimal(),
	isSold: boolean(),
	mood: varchar({ length: 256 }), //Calculated based on lastFed, lastPlayed, lastPet
	hungry: decimal(), //% of hunger, at 100% the pet dies
	lastFed: decimal(),
	lastPlayed: decimal(),
	lastPet: decimal(),
});

export const userPetsTable = pgTable("user_pets", {
	id: integer().notNull().unique(),
	userId: varchar({ length: 256 }).notNull(),
	petId: integer().notNull(),
});

export const userItemsTable = pgTable("user_items", {
	id: integer().notNull().unique(),
	userId: varchar({ length: 256 }).notNull(),
	itemId: integer().notNull(),
	quantity: integer().notNull(),
});

export const itemsTable = pgTable("items", {
	id: integer().notNull().unique(),
	itemName: varchar({ length: 256 }).notNull(),
	itemDescription: varchar({ length: 256 }).notNull(),
	price: decimal(),
	useable: boolean(),
});
