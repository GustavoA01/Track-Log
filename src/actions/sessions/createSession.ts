"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createSessionSchema } from "@/data/schemas/create-session";
import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import type { CreateSessionInput } from "@/data/schemas/create-session";
import { cacheTags } from "@/lib/cache-tags";

export const createSession = async (data: CreateSessionInput) => {
  const userId = await getCurrentUserId();
  const { songId, minutes, notes } = createSessionSchema.parse(data);

  const song = await prisma.song.findFirst({
    where: { id: songId, userId },
  });

  if (!song) {
    throw new Error("Música não encontrada");
  }

  const [session] = await prisma.$transaction([
    prisma.practiceSession.create({
      data: {
        songId,
        minutes,
        notes,
      },
    }),
    prisma.song.update({
      where: { id: songId },
      data: { updatedAt: new Date() },
    }),
  ]);

  revalidatePath("/");
  revalidatePath("/historico");
  revalidatePath(`/musica/${songId}`);
  updateTag(cacheTags.sessions(userId));
  updateTag(cacheTags.songs(userId));

  return toPracticeSessionType(session);
};
