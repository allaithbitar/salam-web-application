"use server";

import { db } from "@/lib/drizzle/drizzle";
import { categories } from "@/lib/drizzle/schema";
import { TCategory } from "@/types/category";
import { eq } from "drizzle-orm";

export const addCategory = async ({ name }: { name: string }) =>
  await db.insert(categories).values({ name });

export const updateCategoryById = async (category: TCategory) =>
  await db
    .update(categories)
    .set({ name: category.name })
    .where(eq(categories.id, category.id));

export const getAllCategories = async () => db.query.categories.findMany();

export const deleteCategoryById = async (id: number) =>
  await db.delete(categories).where(eq(categories.id, id));
