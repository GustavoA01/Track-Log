"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";

export const getSongById = async (id: string) => {
  const userId = await getCurrentUserId();

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
