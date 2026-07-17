"use server";

import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedFolderById = async (id: string, userId: string) => {
  "use cache";

  cacheTag(cacheTags.folders(userId));
  const folder = await prisma.folder.findFirst({
    where: { id, userId },
  });

  return folder ? toFolderType(folder) : null;
};

export const getFolderById = async (id: string) => {
  const userId = await getCurrentUserId();
  return getCachedFolderById(id, userId);
};
