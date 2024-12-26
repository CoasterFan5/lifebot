import {
	boolean,
	decimal,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	userId: varchar({ length: 256 }).notNull().unique(),
	balance: integer(),
	lastWork: timestamp(),
	lastCrime: timestamp(),
	// lastQuickEvent: timestamp(),

	//job things
	hasJob: boolean().notNull().default(false),
	jobName: varchar({ length: 256 }).notNull().default(""),
	jobTierIndex: integer().notNull().default(0),
	jobPath: varchar({ length: 256 }).notNull().default(""),
	jobCompany: varchar({ length: 256 }).notNull().default(""),
	jobMinPay: integer().notNull().default(0),
	jobMaxPay: integer().notNull().default(0),

	//job skills
	technicalSkills: integer().notNull().default(0),
	creativity: integer().notNull().default(0),
	customerService: integer().notNull().default(0),
	organization: integer().notNull().default(0),
	leadership: integer().notNull().default(0),
	timeManagement: integer().notNull().default(0),
	teamwork: integer().notNull().default(0),
	workEthic: integer().notNull().default(0),
	criminality: integer().notNull().default(0),
	reputation: integer().notNull().default(0),
});

export const petsTable = pgTable("pets", {
	id: serial().primaryKey(),
	ownerId: varchar({ length: 256 }).notNull(),
	petName: varchar({ length: 256 }).notNull(),
	species: varchar({ length: 256 }).notNull(), //Cat, Dog, etc.
	level: integer().notNull().default(1),
	rarity: integer().notNull().default(1),
	lastTrain:	timestamp(),
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


