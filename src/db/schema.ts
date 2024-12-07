import { decimal, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: varchar({ length: 256 }).notNull().unique(),
  balance: decimal(),
});
