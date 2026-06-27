"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const deleteSong = async (id: string) => {
  const userId = await getCurrentUserId();

  const existing = await prisma.song.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error("Música não encontrada");
  }

  await prisma.song.delete({
    where: { id },
  });

  revalidatePath("/");
};
