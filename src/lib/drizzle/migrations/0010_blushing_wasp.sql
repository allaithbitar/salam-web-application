ALTER TABLE "article_participation" RENAME COLUMN "memberId" TO "member_id";--> statement-breakpoint
ALTER TABLE "article_participation" RENAME COLUMN "articleId" TO "article_id";--> statement-breakpoint
ALTER TABLE "article_participation" RENAME COLUMN "participationText" TO "participation_text";--> statement-breakpoint
ALTER TABLE "articles" RENAME COLUMN "converImageId" TO "cover_image_id";--> statement-breakpoint
ALTER TABLE "categories_articles" RENAME COLUMN "articleId" TO "article_id";--> statement-breakpoint
ALTER TABLE "categories_articles" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "displayName" TO "display_name";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "whatsAppNo" TO "whatsApp_no";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "facebookUrl" TO "facebook_url";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "linkedinUrl" TO "linkedin_url";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "imageId" TO "image_id";--> statement-breakpoint
ALTER TABLE "permissions_members" RENAME COLUMN "memberId" TO "member_id";--> statement-breakpoint
ALTER TABLE "permissions_members" RENAME COLUMN "permissionId" TO "permission_id";--> statement-breakpoint
ALTER TABLE "article_participation" DROP CONSTRAINT "article_participation_memberId_members_id_fk";
--> statement-breakpoint
ALTER TABLE "article_participation" DROP CONSTRAINT "article_participation_articleId_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" DROP CONSTRAINT "articles_converImageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "categories_articles" DROP CONSTRAINT "categories_articles_articleId_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "categories_articles" DROP CONSTRAINT "categories_articles_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_imageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions_members" DROP CONSTRAINT "permissions_members_memberId_members_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions_members" DROP CONSTRAINT "permissions_members_permissionId_permissions_id_fk";
--> statement-breakpoint
ALTER TABLE "article_participation" DROP CONSTRAINT "article_participation_memberId_articleId_pk";--> statement-breakpoint
ALTER TABLE "categories_articles" DROP CONSTRAINT "categories_articles_articleId_categoryId_pk";--> statement-breakpoint
ALTER TABLE "permissions_members" DROP CONSTRAINT "permissions_members_permissionId_memberId_pk";--> statement-breakpoint
ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_member_id_article_id_pk" PRIMARY KEY("member_id","article_id");--> statement-breakpoint
ALTER TABLE "categories_articles" ADD CONSTRAINT "categories_articles_article_id_category_id_pk" PRIMARY KEY("article_id","category_id");--> statement-breakpoint
ALTER TABLE "permissions_members" ADD CONSTRAINT "permissions_members_permission_id_member_id_pk" PRIMARY KEY("permission_id","member_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_participation" ADD CONSTRAINT "article_participation_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_images_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_articles" ADD CONSTRAINT "categories_articles_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_articles" ADD CONSTRAINT "categories_articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "members" ADD CONSTRAINT "members_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permissions_members" ADD CONSTRAINT "permissions_members_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permissions_members" ADD CONSTRAINT "permissions_members_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
