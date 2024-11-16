CREATE TABLE IF NOT EXISTS "article_participation" (
	"memberId" integer NOT NULL,
	"articleId" integer NOT NULL,
	"" text DEFAULT '' NOT NULL,
	CONSTRAINT "article_participation_memberId_articleId_pk" PRIMARY KEY("memberId","articleId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
