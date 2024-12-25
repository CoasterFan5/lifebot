import { sql } from "drizzle-orm";

import type { PgColumn } from "drizzle-orm/pg-core";

/*
Syntax sugar for incrementing in drizzle.
*/
export const increment = (column: PgColumn, amount: number) => {
	return sql`${column} + ${amount}`;
};
