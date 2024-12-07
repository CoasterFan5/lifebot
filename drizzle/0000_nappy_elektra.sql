CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(256) NOT NULL,
	"balance" numeric,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
