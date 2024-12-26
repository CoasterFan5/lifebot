ALTER TABLE "user_pets" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user_pets" CASCADE;--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "ownerId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "level" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "rarity" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "lastTrain" timestamp;--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "age";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "isSold";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "mood";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "hungry";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "lastFed";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "lastPlayed";--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "lastPet";