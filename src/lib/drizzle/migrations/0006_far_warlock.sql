ALTER TABLE "article_participation" DROP CONSTRAINT "article_participation_articleId_members_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
