import { articles } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { TCategory } from "./category";
import { TImage } from "./image";
import { TMember } from "./member";
import { TArticleParticipation } from "./articleParticipation";

export type TArticleEntity = InferSelectModel<typeof articles>;

export type TArticleModel = TArticleEntity & {
  categories: { category: TCategory }[];
  participations: (Pick<TArticleParticipation, "participationText"> & {
    member: Pick<TMember, "id" | "displayName">;
  })[];
  cover: TImage | null;
};

export type TArticle = Omit<TArticleModel, "categories"> & {
  categories: TCategory[];
};

export type TUpdateArticleDto = Omit<
  TArticle,
  "categories" | "participations"
> & {
  categories: number[];
  participations: {
    memberId: number;
    participationText: string;
  }[];
};

export type TUpdateArticleCoverDto = {
  newCoverImage: File;
  oldCoverImageId?: number;
  articleId: number;
};
