"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedFolders = async (userId: string) => {
  "use cache";

  cacheTag(cacheTags.folders(userId));
  const folders = await prisma.folder.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return folders.map(toFolderType);
};

export const getFolders = async () => {
  const userId = await getCurrentUserId();
  return getCachedFolders(userId);
};
