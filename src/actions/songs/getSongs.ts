"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const songWithFoldersInclude = {
  folders: {
    select: { folderId: true },
    orderBy: { createdAt: "asc" as const },
  },
};

const getCachedSongs = async (userId: string) => {
  "use cache";

  cacheTag(cacheTags.songs(userId));
  const songs = await prisma.song.findMany({
    where: { userId },
    include: songWithFoldersInclude,
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

export const getSongs = async () => {
  const userId = await getCurrentUserId();
  return getCachedSongs(userId);
};
