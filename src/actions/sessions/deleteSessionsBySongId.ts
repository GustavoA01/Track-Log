"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const deleteSessionsBySongId = async (songId: string) => {
  const userId = await getCurrentUserId();

  const song = await prisma.song.findFirst({
    where: { id: songId, userId },
  });

  if (!song) {
    throw new Error("Música não encontrada");
  }

  await prisma.practiceSession.deleteMany({
    where: { songId },
  });

  revalidatePath("/");
  revalidatePath("/historico");
  revalidatePath(`/musica/${songId}`);
};
