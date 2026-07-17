"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedSongById = async (id: string, userId: string) => {
  "use cache";

  cacheTag(cacheTags.songs(userId));
  const song = await prisma.song.findFirst({
    where: { id, userId },
    include: {
      folders: {
        select: { folderId: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return song
    ? toSongType(
        song,
        0,
        song.folders.map((folder) => folder.folderId),
      )
    : null;
};

export const getSongById = async (id: string) => {
  const userId = await getCurrentUserId();
  return getCachedSongById(id, userId);
};
