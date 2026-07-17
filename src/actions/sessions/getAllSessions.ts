"use server";
import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedAllSessions = async (userId: string) => {
  "use cache";

  cacheTag(cacheTags.sessions(userId));
  const sessions = await prisma.practiceSession.findMany({
    where: {
      song: { userId },
    },
    orderBy: { date: "desc" },
  });

  return sessions.map(toPracticeSessionType);
};

export const getAllSessions = async () => {
  const userId = await getCurrentUserId();
  return getCachedAllSessions(userId);
};
