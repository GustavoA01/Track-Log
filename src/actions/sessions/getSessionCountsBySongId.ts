"use server";

import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getSessionCountsBySongId = async () => {
  const userId = await getCurrentUserId();

  const counts = await prisma.practiceSession.groupBy({
    by: ["songId"],
    where: {
      song: { userId },
    },
    _count: {
      id: true,
    },
  });

  return Object.fromEntries(
    counts.map((item) => [item.songId, item._count.id]),
  ) as Record<string, number>;
};
