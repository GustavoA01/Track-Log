"use server";

import { revalidatePath } from "next/cache";

import { folderFormSchema } from "@/data/schemas/folder-form";
import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

export const updateFolder = async (id: string, input: FolderFormValuesType) => {
  const userId = await getCurrentUserId();
  const values = folderFormSchema.parse(input);

  const existing = await prisma.folder.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error("Pasta não encontrada");
  }

  const folder = await prisma.folder.update({
    where: { id },
    data: {
      name: values.name,
      imageUrl: values.imageUrl || null,
    },
  });

  revalidatePath("/");

  return toFolderType(folder);
};
