"use server";

import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getPracticeStats = async () => {
  const userId = await getCurrentUserId();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [totalAgg, weeklyAgg, sessionCount] = await Promise.all([
    prisma.practiceSession.aggregate({
      where: { song: { userId } },
      _sum: { minutes: true },
    }),
    prisma.practiceSession.aggregate({
      where: {
        song: { userId },
        date: { gte: weekAgo },
      },
      _sum: { minutes: true },
    }),
    prisma.practiceSession.count({
      where: { song: { userId } },
    }),
  ]);

  return {
    totalMinutes: totalAgg._sum.minutes ?? 0,
    weeklyMinutes: weeklyAgg._sum.minutes ?? 0,
    sessionCount,
  };
};
