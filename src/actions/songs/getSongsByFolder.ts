"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";
import { SongRecord } from "@/lib/prisma-types";

export const getSongsByFolder = async (folderId: string) => {
  const userId = await getCurrentUserId();

  const songs = (await prisma.song.findMany({
    where: { userId, folderId },
    orderBy: { createdAt: "desc" },
  })) as SongRecord[];

  return songs.map((song) => toSongType(song));
};
