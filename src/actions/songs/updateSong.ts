"use server";
import { revalidatePath } from "next/cache";
import {
  formValuesToSongPayload,
  songFormSchema,
} from "@/data/schemas/song-form";
import { resolveSongAccentColor } from "@/lib/accent-color";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/lib/mappers";
import { prisma } from "@/lib/prisma";
import type { UpdateSongInput } from "./types";

export const updateSong = async (id: string, input: UpdateSongInput) => {
  const userId = await getCurrentUserId();

  const existing = await prisma.song.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new Error("Música não encontrada");
  }

  const values = input.title !== undefined ? songFormSchema.parse(input) : null;
  const payload = values ? formValuesToSongPayload(values) : null;

  if (input.folderId) {
    const folder = await prisma.folder.findFirst({
      where: { id: input.folderId, userId },
    });

    if (!folder) {
      throw new Error("Pasta não encontrada");
    }
  }

  const imageUrl = payload ? (payload.imageUrl ?? null) : undefined;
  const accentColor =
    imageUrl !== undefined
      ? await resolveSongAccentColor(
          imageUrl,
          existing.imageUrl,
          existing.accentColor,
        )
      : undefined;

  const song = await prisma.song.update({
    where: { id },
    data: {
      ...(input.folderId !== undefined ? { folderId: input.folderId } : {}),
      ...(payload
        ? {
            title: payload.title,
            artist: payload.artist,
            status: payload.status,
            difficulty: payload.difficulty,
            genre: payload.genre,
            instrument: payload.instrument,
            notes: payload.notes,
            imageUrl,
            accentColor,
            videoUrl: payload.videoUrl ?? null,
            tabUrl: payload.tabUrl ?? null,
          }
        : {}),
    },
  });

  revalidatePath("/");
  revalidatePath(`/musica/${song.id}`);

  return toSongType(song);
};
