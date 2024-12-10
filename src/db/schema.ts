import {
  decimal,
  pgTable,
  varchar,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: varchar({ length: 256 }).notNull().unique(),
  balance: integer(),
  lastWork: timestamp(),
  lastCrime: timestamp(),
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
