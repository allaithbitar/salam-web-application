import { questions } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type TQuestion = InferSelectModel<typeof questions>;

export type TGetQuestionsPayload = {
  status?: TQuestion["status"];
  search?: string;
  order?: "dsc" | "asc";
  pageSize?: number;
  pageNumber?: number;
};
