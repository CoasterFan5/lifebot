ALTER TABLE "pets" DROP CONSTRAINT "pets_id_unique";--> statement-breakpoint
ALTER TABLE "pets" ADD PRIMARY KEY ("id");