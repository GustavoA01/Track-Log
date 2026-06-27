"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";
import { SongRecord } from "@/lib/prisma-types";

export const getSongs = async () => {
  const userId = await getCurrentUserId();

  const songs = (await prisma.song.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })) as SongRecord[];

  return songs.map((song) => toSongType(song));
};
