"use server";

import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";

const getCachedSessionCountsBySongId = async (userId: string) => {
  "use cache";

  cacheTag(cacheTags.sessions(userId));
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

export const getSessionCountsBySongId = async () => {
  const userId = await getCurrentUserId();
  return getCachedSessionCountsBySongId(userId);
};
