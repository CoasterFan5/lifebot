CREATE TABLE IF NOT EXISTS "houses" (
	"id" integer NOT NULL,
	"ownerId" varchar(256) NOT NULL,
	"location" integer NOT NULL,
	"quality" integer NOT NULL,
	"squareFootage" integer NOT NULL,
	"furnitureScore" integer NOT NULL,
	"leased" boolean DEFAULT false NOT NULL,
	"lastRentCollection" timestamp,
	"rentPrice" integer DEFAULT 0 NOT NULL,
	"tenantScore" integer DEFAULT 0 NOT NULL,
	"tenanteWealth" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "houses_id_unique" UNIQUE("id")
);
