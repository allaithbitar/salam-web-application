ALTER TABLE "articles" ADD COLUMN "content_short" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" DROP COLUMN IF EXISTS "meta_title";--> statement-breakpoint
ALTER TABLE "articles" DROP COLUMN IF EXISTS "meta_description";