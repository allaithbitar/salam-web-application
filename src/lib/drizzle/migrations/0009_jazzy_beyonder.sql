ALTER TABLE "article_participation" ADD COLUMN "participationText" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "article_participation" DROP COLUMN IF EXISTS "";