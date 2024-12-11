CREATE TABLE IF NOT EXISTS "user_pets" (
	"id" integer NOT NULL,
	"userId" varchar(256) NOT NULL,
	"petId" integer NOT NULL,
	CONSTRAINT "user_pets_id_unique" UNIQUE("id")
);
