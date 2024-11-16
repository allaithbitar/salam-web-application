"use server";
import { db } from "@/lib/drizzle/drizzle";
import { images, members } from "@/lib/drizzle/schema";
import { TMember, TMemberEntity } from "@/types/member";
import { and, eq } from "drizzle-orm";
import {
  prepareImage,
  removeImageFromUploadsByName,
  writeImageToUploads,
} from "./images";
import { TImage } from "@/types/image";

export type TGetMembersOptions = Partial<Pick<TMember, "status">>;

const withImage = {
  image: true,
} as const;

const withoutPassword = {
  password: false,
} as const;

export const getMembers = async ({ status }: TGetMembersOptions = {}): Promise<
  TMember[]
> =>
  db.query.members.findMany({
    with: {
      ...withImage,
    },
    columns: {
      ...withoutPassword,
    },
    where: and(status ? eq(members.status, status) : undefined),
  });

export const getMemberById = async (memberId: number) =>
  db.query.members.findFirst({
    with: {
      ...withImage,
    },
    columns: {
      ...withoutPassword,
    },
    where: eq(members.id, memberId),
  });

export const createNewMember = async (
  payload: Pick<TMemberEntity, "displayName" | "email" | "password">,
) =>
  db.insert(members).values({
    ...payload,
    status: "active",
  });

export const updateMemberImage = async ({
  memberId,
  oldImage,
  image,
}: {
  image: File;
  oldImage: TImage | null;
  memberId: number;
}) => {
  if (oldImage) {
    await db.delete(images).where(eq(images.id, oldImage.id));
    await removeImageFromUploadsByName(oldImage.fileName);
  }
  const { fileName, size, width, height, buffer } = await prepareImage(image);
  await writeImageToUploads(fileName, buffer);
  const { imageId } = (
    await db
      .insert(images)
      .values({
        fileName,
        width,
        height,
        size,
      })
      .returning({ imageId: images.id })
  )[0];

  await db
    .update(members)
    .set({
      imageId,
    })
    .where(eq(members.id, memberId));
};
