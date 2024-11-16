import { categories } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type TCategory = InferSelectModel<typeof categories>;
