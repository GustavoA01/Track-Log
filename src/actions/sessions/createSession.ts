"use server";

import { revalidatePath } from "next/cache";
import { createSessionSchema } from "@/data/schemas/create-session";
import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";
import type { CreateSessionInput } from "@/data/schemas/create-session";

export const createSession = async (data: CreateSessionInput) => {
  const userId = await getCurrentUserId();
  const { songId, minutes, notes } = createSessionSchema.parse(data);

  const song = await prisma.song.findFirst({
    where: { id: songId, userId },
  });

  if (!song) {
    throw new Error("Música não encontrada");
  }

  const session = await prisma.practiceSession.create({
    data: {
      songId,
      minutes,
      notes,
    },
  });

  revalidatePath("/");
  revalidatePath("/historico");
  revalidatePath(`/musica/${songId}`);

  return toPracticeSessionType(session);
};
