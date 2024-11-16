import { TArticle, TArticleModel } from "@/types/article";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMaxMessage = (length: number) =>
  `يجب ان يكون من ${length} محرف على الاكثر`;

export const getMinMessage = (length: number) =>
  `يجب ان يكون من ${length} محرف على الاقل`;

export const getRequiredMessage = () => "مطلوب";

export const getMinCountMessage = (count: number) => `مطلوب ${count} على الاقل`;

export const prepareArticles = (articles: TArticleModel[]): TArticle[] =>
  articles.map((c) => ({
    ...c,
    categories: c.categories.map((c) => c.category),
    // participations: c.participations.map((m) => ({})),
  }));

export const formatIsoDate = (date: string, dateTime = true) =>
  Intl.DateTimeFormat("ar-SY", {
    ...(dateTime
      ? {
          dateStyle: "long",
          timeStyle: "short",
        }
      : {
          dateStyle: "short",
        }),
  }).format(new Date(date));
