import { members } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { TImage } from "./image";

export type TMemberEntity = InferSelectModel<typeof members>;

export type TMember = Omit<TMemberEntity, "password"> & {
  image: TImage | null;
};

export type TUpdateMemberImageDto = {
  image: File;
  oldImage: TImage | null;
  memberId: number;
};
