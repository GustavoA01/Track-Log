"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

const songWithFoldersInclude = {
  folders: {
    select: { folderId: true },
    orderBy: { createdAt: "asc" as const },
  },
};

export const getSongs = async () => {
  const userId = await getCurrentUserId();

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
