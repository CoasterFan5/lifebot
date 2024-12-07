ALTER TABLE "users" RENAME COLUMN "id" TO "userId";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_userId_unique" UNIQUE("userId");