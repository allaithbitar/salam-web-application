import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const articleStatusEnum = pgEnum("article_status_enum", [
  "draft",
  "published",
  "archived",
]);

export const memberStatusEnum = pgEnum("member_status_enum", [
  "pending_approval",
  "active",
  "inactive",
]);

export const questionStatus = pgEnum("question_status", [
  "unanswered",
  "answered",
  "archived",
]);

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  publishedAt: timestamp("published_at", {
    mode: "string",
    withTimezone: true,
  }),
  slug: text("slug").notNull().default(""),
  title: text("title").notNull().default(""),
  content: text("content").notNull().default(""),
  contentShort: text("content_short").notNull().default(""),
  // metaTitle: text("meta_title").notNull().default(""),
  // metaDescription: text("meta_description").notNull().default(""),
  metaKeywords: text("meta_keywords").notNull().default(""),
  status: articleStatusEnum("status").notNull().default("draft"),
  views: integer("views").notNull().default(0),
  coverImageId: integer("cover_image_id").references(() => images.id, {
    onDelete: "set null",
  }),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  displayName: text("display_name").notNull().default(""),
  email: text("email").notNull(),
  password: text("password").notNull().default(""),
  role: text("role").notNull().default(""),
  status: memberStatusEnum("status").default("pending_approval"),
  about: text("about").notNull().default(""),
  whatsAppNo: text("whatsApp_no").notNull().default(""),
  facebookUrl: text("facebook_url").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  telegram: text("telegram").notNull().default(""),
  linkedinUrl: text("linkedin_url").notNull().default(""),
  imageId: integer("image_id").references(() => images.id, {
    onDelete: "set null",
  }),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  fileName: text("fileName").notNull(),
  size: integer("size").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
});

export const categoriesToArticles = pgTable(
  "categories_articles",
  {
    articleId: integer("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.articleId, t.categoryId] }),
  }),
);

export const articleRelations = relations(articles, ({ many, one }) => ({
  categories: many(categoriesToArticles),
  cover: one(images, {
    references: [images.id],
    fields: [articles.coverImageId],
  }),
  participations: many(articleParticipation),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  articles: many(categoriesToArticles),
}));

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(),
});

export const articleParticipation = pgTable(
  "article_participation",
  {
    memberId: integer("member_id")
      .notNull()
      .references(() => members.id, {
        onDelete: "cascade",
      }),
    articleId: integer("article_id")
      .notNull()
      .references(() => articles.id, {
        onDelete: "cascade",
      }),
    participationText: text("participation_text").notNull().default(""),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.memberId, t.articleId] }),
  }),
);

export const categoriesToArticlesRelations = relations(
  categoriesToArticles,
  ({ one }) => ({
    article: one(articles, {
      fields: [categoriesToArticles.articleId],
      references: [articles.id],
    }),
    category: one(categories, {
      fields: [categoriesToArticles.categoryId],
      references: [categories.id],
    }),
  }),
);

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  question: text("question").notNull().default(""),
  answer: text("answer").notNull().default(""),
  answeredAt: timestamp("answered_at", { mode: "string", withTimezone: true }),
  status: questionStatus("status").notNull().default("unanswered"),
});

// relations //
export const permissionsRelations = relations(permissions, ({ many }) => ({
  members: many(permissionsToMembers),
}));

export const membersRelations = relations(members, ({ one, many }) => ({
  image: one(images, {
    references: [images.id],
    fields: [members.imageId],
  }),
  permissions: many(permissionsToMembers),
  participations: many(articleParticipation),
}));

export const permissionsToMembers = pgTable(
  "permissions_members",
  {
    memberId: integer("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.permissionId, t.memberId] }),
  }),
);

export const permissionsToMembersRelations = relations(
  permissionsToMembers,
  ({ one }) => ({
    member: one(members, {
      fields: [permissionsToMembers.memberId],
      references: [members.id],
    }),
    permission: one(permissions, {
      fields: [permissionsToMembers.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const articleParticipationRelations = relations(
  articleParticipation,
  ({ one }) => ({
    member: one(members, {
      fields: [articleParticipation.memberId],
      references: [members.id],
    }),
    article: one(articles, {
      fields: [articleParticipation.articleId],
      references: [articles.id],
    }),
  }),
);
