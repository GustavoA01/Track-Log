"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedSessionsBySongId = async (songId: string, userId: string) => {
  "use cache";

  cacheTag(cacheTags.sessions(userId));
  const sessions = await prisma.practiceSession.findMany({
    where: {
      songId,
      song: { userId },
    },
    orderBy: { date: "desc" },
  });

  return sessions.map(toPracticeSessionType);
};

export const getSessionsBySongId = async (songId: string) => {
  const userId = await getCurrentUserId();
  return getCachedSessionsBySongId(songId, userId);
};
