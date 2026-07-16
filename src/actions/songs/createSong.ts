"use server";
import { revalidatePath } from "next/cache";
import {
  formValuesToSongPayload,
  songFormSchema,
} from "@/data/schemas/song-form";
import { resolveSongAccentColor } from "@/utils/accent-color";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { validateSongFolderIds } from "@/actions/songs/folderUtils";
import { CreateSongInput } from "@/data/types/actions";

export const createSong = async (data: CreateSongInput) => {
  const userId = await getCurrentUserId();
  const values = songFormSchema.parse(data);
  const payload = formValuesToSongPayload(values);
  const folderIds = values.folderIds ?? [];

  await validateSongFolderIds(userId, folderIds);

  const imageUrl = payload.imageUrl ?? null;
  const accentColor = await resolveSongAccentColor(imageUrl);

  const song = await prisma.song.create({
    data: {
      userId,
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
      folders:
        folderIds.length > 0
          ? {
              create: folderIds.map((folderId) => ({ folderId })),
            }
          : undefined,
    },
    include: {
      folders: {
        select: { folderId: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/musica/${song.id}`);

  return toSongType(
    song,
    0,
    song.folders.map((folder) => folder.folderId),
  );
};
