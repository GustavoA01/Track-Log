"use server";
import { parse } from "date-fns";
import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
import {
  editSessionSchema,
  type UpdateSessionInput,
} from "@/data/schemas/edit-session";
import { getCurrentUserId } from "@/lib/auth";
import { toPracticeSessionType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { cacheTags } from "@/lib/cache-tags";

const sessionDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida");

export const updateSession = async (
  sessionId: string,
  input: UpdateSessionInput,
) => {
  const userId = await getCurrentUserId();
  const { minutes, notes } = editSessionSchema
    .pick({ minutes: true, notes: true })
    .parse({
      minutes: input.minutes,
      notes: input.notes,
    });

  const existing = await prisma.practiceSession.findFirst({
    where: {
      id: sessionId,
      song: { userId },
    },
  });

  if (!existing) throw new Error("Sessão não encontrada");

  const parsedDate =
    input.date !== undefined ? sessionDateSchema.parse(input.date) : undefined;

  const session = await prisma.practiceSession.update({
    where: { id: sessionId },
    data: {
      minutes,
      notes,
      ...(parsedDate !== undefined
        ? { date: parse(parsedDate, "yyyy-MM-dd", new Date()) }
        : {}),
    },
  });

  revalidatePath("/");
  revalidatePath("/historico");
  revalidatePath(`/musica/${session.songId}`);
  updateTag(cacheTags.sessions(userId));

  return toPracticeSessionType(session);
};
