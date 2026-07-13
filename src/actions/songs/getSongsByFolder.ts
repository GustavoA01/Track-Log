"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

export const getSongsByFolder = async (folderId: string) => {
  const userId = await getCurrentUserId();

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
