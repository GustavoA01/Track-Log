"use server";
import { revalidatePath } from "next/cache";
import { folderFormSchema } from "@/data/schemas/folder-form";
import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

const DEFAULT_FOLDER_COLOR = "#7c3aed";

export const createFolder = async (input: FolderFormValuesType) => {
  const userId = await getCurrentUserId();
  const values = folderFormSchema.parse(input);

  const folder = await prisma.folder.create({
    data: {
      userId,
      name: values.name,
      imageUrl: values.imageUrl || null,
      color: DEFAULT_FOLDER_COLOR,
    },
  });

  revalidatePath("/");

  return toFolderType(folder);
};
