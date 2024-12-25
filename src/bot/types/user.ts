import type { usersTable } from "../../db/schema";

export type LifebotUser = typeof usersTable.$inferSelect;
