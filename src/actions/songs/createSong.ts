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
import type { CreateSongInput } from "./types";

export const createSong = async (data: CreateSongInput) => {
  const userId = await getCurrentUserId();
  const values = songFormSchema.parse(data);
  const payload = formValuesToSongPayload(values);

  if (data.folderId) {
    const folder = await prisma.folder.findFirst({
      where: { id: data.folderId, userId },
    });

    if (!folder) {
      throw new Error("Pasta não encontrada");
    }
  }

  const imageUrl = payload.imageUrl ?? null;
  const accentColor = await resolveSongAccentColor(imageUrl);

  const song = await prisma.song.create({
    data: {
      userId,
      folderId: data.folderId ?? null,
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
    },
  });

  revalidatePath("/");
  revalidatePath(`/musica/${song.id}`);

  return toSongType(song);
};
