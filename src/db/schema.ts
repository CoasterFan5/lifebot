import {
  boolean,
  decimal,
  integer,
  pgEnum,
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

export const housesTable = pgTable("houses", {
  id: serial("id").unique().primaryKey(),
  ownerId: varchar({ length: 256 }).notNull(),
  location: integer().notNull(),
  quality: integer().notNull(),
  squareFootage: integer().notNull(),
  furnitureScore: integer().notNull(),
  leased: boolean().notNull().default(false),
  lastRentCollection: timestamp(),
  rentPrice: integer().notNull().default(0),
  tenantScore: integer().notNull().default(0), // 0-100, affects the level of damage tenant does on every collect.
  tenanteWealth: integer().notNull().default(0), // When this reaches 0, tenant will move out
});

export const furnitureTable = pgTable("furniture", {
  id: serial("id").unique().primaryKey(),
  ownerId: varchar({ length: 256 }).notNull(),
  originalValue: integer().notNull(),
  type: varchar({ length: 256 }).notNull(),
  condition: integer().notNull(),
  material: varchar({ length: 256 }).notNull(),
  antique: boolean().notNull(),
  age: integer().notNull(),
  houseId: integer(), // The id of the house the furniture is in
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
