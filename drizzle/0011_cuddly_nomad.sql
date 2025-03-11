CREATE TABLE IF NOT EXISTS "furniture" (
	"id" serial PRIMARY KEY NOT NULL,
	"ownerId" varchar(256) NOT NULL,
	"originalValue" integer NOT NULL,
	"type" varchar(256) NOT NULL,
	"condition" integer NOT NULL,
	"material" varchar(256) NOT NULL,
	"antique" boolean NOT NULL,
	"age" integer NOT NULL,
	CONSTRAINT "furniture_id_unique" UNIQUE("id")
);
