import { images } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type TImage = InferSelectModel<typeof images>;
