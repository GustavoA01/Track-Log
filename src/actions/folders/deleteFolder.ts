"use server";

import { revalidatePath, updateTag } from "next/cache";

import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cacheTags } from "@/lib/cache-tags";

export const deleteFolder = async (id: string) => {
  const userId = await getCurrentUserId();

  const existing = await prisma.folder.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error("Pasta não encontrada");
  }

  await prisma.folder.delete({
    where: { id },
  });

  revalidatePath("/");
  updateTag(cacheTags.folders(userId));
  updateTag(cacheTags.songs(userId));
};
