import { decimal, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar({ length: 256 }).notNull().unique(),
  balance: decimal(),
});
