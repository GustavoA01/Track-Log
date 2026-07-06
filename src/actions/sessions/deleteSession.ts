"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const deleteSession = async (sessionId: string) => {
  const userId = await getCurrentUserId();

  const session = await prisma.practiceSession.findFirst({
    where: {
      id: sessionId,
      song: { userId },
    },
    select: { songId: true },
  });

  if (!session) {
    throw new Error("Sessão não encontrada");
  }

  await prisma.practiceSession.delete({
    where: { id: sessionId },
  });

  revalidatePath("/");
  revalidatePath("/historico");
  revalidatePath(`/musica/${session.songId}`);
};
