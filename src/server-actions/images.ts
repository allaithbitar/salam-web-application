"use server";

import { db } from "@/lib/drizzle/drizzle";
import { images } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { rm, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const uploadsFolderPath = path.join(process.cwd(), "public/uploads");

export const removeImageById = async (id: number) =>
  db.delete(images).where(eq(images.id, id));

export const removeImageFromUploadsByName = async (name: string) =>
  rm(`${uploadsFolderPath}/${name}`);

export const writeImageToUploads = async (fileName: string, buffer: Buffer) =>
  writeFile(`${uploadsFolderPath}/${fileName}`, buffer);

export const prepareImage = async (imageFile: File) => {
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const fileName = `${Date.now()}_${imageFile.name.replaceAll(" ", "_")}`;
  return {
    fileName,
    size: metadata.size ?? 0,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    buffer,
  };
};
