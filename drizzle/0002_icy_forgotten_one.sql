CREATE TABLE IF NOT EXISTS "pets" (
	"id" integer NOT NULL,
	"ownerId" varchar(256) NOT NULL,
	"petName" varchar(256) NOT NULL,
	"species" varchar(256) NOT NULL,
	"age" numeric,
	"price" numeric,
	"isSold" boolean,
	"mood" varchar(256),
	"hungry" numeric,
	"lastFed" numeric,
	"lastPlayed" numeric,
	"lastPet" numeric,
	CONSTRAINT "pets_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "balance" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastWork" timestamp;