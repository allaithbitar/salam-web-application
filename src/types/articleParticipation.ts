import { articleParticipation } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type TArticleParticipation = InferSelectModel<
  typeof articleParticipation
>;
