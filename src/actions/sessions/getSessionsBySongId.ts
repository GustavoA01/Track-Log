"use server";

import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";

export const getSessionsBySongId = async (songId: string) => {
  const userId = await getCurrentUserId();

  const sessions = await prisma.practiceSession.findMany({
    where: {
      songId,
      song: { userId },
    },
    orderBy: { date: "desc" },
  });

  return sessions.map(toPracticeSessionType);
};
