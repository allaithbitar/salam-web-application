"use server";
import { db } from "@/lib/drizzle/drizzle";
import {
  articleParticipation,
  articles,
  categoriesToArticles,
  images,
} from "@/lib/drizzle/schema";
import { prepareArticles } from "@/lib/utils";
import {
  TArticle,
  TArticleEntity,
  TUpdateArticleCoverDto,
  TUpdateArticleDto,
} from "@/types/article";
import { and, eq, inArray } from "drizzle-orm";
import getSlug from "speakingurl";
import {
  prepareImage,
  removeImageFromUploadsByName,
  writeImageToUploads,
} from "./images";

type TGetArticlesOptions = {
  limit?: number;
  status?: TArticleEntity["status"];
  categoryIds?: number[];
};

const withCategories = {
  categories: {
    columns: {
      articleId: false,
      categoryId: false,
    },
    with: { category: true },
  },
} as const;

const withParticipations = {
  participations: {
    columns: {
      participationText: true,
    },
    with: {
      member: {
        columns: {
          id: true,
          displayName: true,
        },
      },
    },
  },
} as const;

const withCover = {
  cover: true,
} as const;

export const getArticlesWithCategories = async ({
  limit,
  status,
}: TGetArticlesOptions = {}): Promise<TArticle[]> => {
  const articlesQueryResult = await db.query.articles.findMany({
    with: {
      ...withCategories,
      ...withCover,
      ...withParticipations,
    },
    ...(limit && { limit }),
    where: and(status ? eq(articles.status, status) : undefined),
  });
  const articlesWithCategoriesPerpared = prepareArticles(articlesQueryResult);
  return articlesWithCategoriesPerpared;
};

export const getArticleById = async (id: number): Promise<TArticle | null> => {
  const article = await db.query.articles.findFirst({
    where: eq(articles.id, id),
    with: {
      ...withCategories,
      ...withCover,
      ...withParticipations,
    },
  });

  if (!article) return null;

  return prepareArticles([article])[0];
};

export const getArticlesByCategoryIds = async (
  {
    categoryIds,
    limit,
    status,
  }: Omit<TGetArticlesOptions, "categoryIds"> & {
    categoryIds: number[];
  } = { categoryIds: [] },
): Promise<TArticle[]> => {
  const articleIdsToFetch = (
    await db.query.categoriesToArticles.findMany({
      where: inArray(categoriesToArticles.categoryId, categoryIds),
    })
  ).map((c) => c.articleId);

  const articlesQueryResult = await db.query.articles.findMany({
    where: and(
      status ? eq(articles.status, status) : undefined,
      inArray(articles.id, articleIdsToFetch),
    ),
    with: {
      ...withCategories,
      ...withCover,
      ...withParticipations,
    },
    ...(limit && { limit }),
  });
  const articlesWithCategoriesPerpared = prepareArticles(articlesQueryResult);

  return articlesWithCategoriesPerpared;
};

export const getArticleBySlug = async (
  slug: string,
): Promise<TArticle | null> => {
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
    with: {
      ...withCategories,
      ...withCover,
      ...withParticipations,
    },
  });

  if (!article) return null;

  return prepareArticles([article])[0];
};

export const createDraftArticle = async () =>
  (await db.insert(articles).values({}).returning({ id: articles.id }))[0];

export const updateArticleCoverImage = async ({
  newCoverImage,
  oldCoverImageId,
  articleId,
}: TUpdateArticleCoverDto) => {
  console.log(newCoverImage, oldCoverImageId, articleId);

  if (oldCoverImageId) {
    const oldImage = await db.query.images.findFirst({
      where: eq(images.id, oldCoverImageId),
    });
    if (oldImage) {
      await removeImageFromUploadsByName(oldImage.fileName);
      await db.delete(images).where(eq(images.id, oldImage.id));
    }
  }
  const { height, width, size, fileName, buffer } =
    await prepareImage(newCoverImage);
  // newArticleImage = filename;
  await writeImageToUploads(fileName, buffer);

  const { id: newCoverImageId } = (
    await db
      .insert(images)
      .values({
        height,
        width,
        size,
        fileName,
      })
      .returning({ id: images.id })
  )[0];
  await db
    .update(articles)
    .set({
      coverImageId: newCoverImageId,
    })
    .where(eq(articles.id, articleId));
};

export const updateArticle = async (article: TUpdateArticleDto) => {
  await db
    .update(articles)
    .set({
      // metaTitle: article.metaTitle,
      // metaDescription: article.metaDescription,
      metaKeywords: article.metaKeywords,
      title: article.title,
      content: article.content,
      contentShort: article.content.replaceAll(/<[^>]+>/g, "").slice(0, 155),
      updatedAt: new Date().toISOString(),
      slug: getSlug(article.title, {
        lang: "ar",
        titleCase: true,
      }),
      coverImageId: article.coverImageId,
      // image: newArticleImage || article.image,
    })
    .where(eq(articles.id, article.id));

  if (article.categories.length) {
    await db
      .delete(categoriesToArticles)
      .where(eq(categoriesToArticles.articleId, article.id));

    await db.insert(categoriesToArticles).values(
      article.categories.map((c) => ({
        articleId: article.id,
        categoryId: c,
      })),
    );
  }

  if (article.participations.length) {
    await db
      .delete(articleParticipation)
      .where(eq(articleParticipation.articleId, article.id));

    await db.insert(articleParticipation).values(
      article.participations.map((p) => ({
        articleId: article.id,
        memberId: p.memberId,
        participationText: p.participationText,
      })),
    );
  }
};

export const deleteArticleById = async (id: number) => {
  const { coverImageId } = (
    await db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning({ coverImageId: articles.coverImageId })
  )[0];
  if (coverImageId) {
    const articleCoverImage = await db.query.images.findFirst({
      where: eq(images.id, coverImageId),
    });
    if (articleCoverImage) {
      await removeImageFromUploadsByName(articleCoverImage.fileName);
    }
  }
};

export const publishArticleById = async (id: number) => {
  await db
    .update(articles)
    .set({ publishedAt: new Date().toISOString(), status: "published" })
    .where(eq(articles.id, id));
};
