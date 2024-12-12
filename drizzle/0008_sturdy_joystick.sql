CREATE TABLE IF NOT EXISTS "items" (
	"id" integer NOT NULL,
	"itemName" varchar(256) NOT NULL,
	"itemDescription" varchar(256) NOT NULL,
	"price" numeric,
	"useable" boolean,
	CONSTRAINT "items_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_items" (
	"id" integer NOT NULL,
	"userId" varchar(256) NOT NULL,
	"itemId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "user_items_id_unique" UNIQUE("id")
);
