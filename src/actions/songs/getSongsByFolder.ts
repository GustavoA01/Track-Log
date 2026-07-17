"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedSongsByFolder = async (folderId: string, userId: string) => {
  "use cache";

  cacheTag(cacheTags.songs(userId));
  const songs = await prisma.song.findMany({
    where: {
      userId,
      folders: {
        some: { folderId },
      },
    },
    include: {
      folders: {
        select: { folderId: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return songs.map((song) =>
    toSongType(
      song,
      0,
      song.folders.map((folder) => folder.folderId),
    ),
  );
};

export const getSongsByFolder = async (folderId: string) => {
  const userId = await getCurrentUserId();
  return getCachedSongsByFolder(folderId, userId);
};
