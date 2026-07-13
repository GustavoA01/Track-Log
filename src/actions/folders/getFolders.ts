"use server";

import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

export const getFolders = async () => {
  const userId = await getCurrentUserId();

  const folders = await prisma.folder.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return folders.map(toFolderType);
};
