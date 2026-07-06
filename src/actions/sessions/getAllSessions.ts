"use server";

import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";

export const getAllSessions = async () => {
  const userId = await getCurrentUserId();

  const sessions = await prisma.practiceSession.findMany({
    where: {
      song: { userId },
    },
    orderBy: { date: "desc" },
  });

  return sessions.map(toPracticeSessionType);
};
