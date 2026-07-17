"use server";

import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSongType } from "@/utils/mappers";
import { getSongFolderIds } from "@/actions/songs/folderUtils";
import { songStatusValues } from "@/data/schemas/song-form";
import type { SongStatusType } from "@/data/types";
import { cacheTags } from "@/lib/cache-tags";

const statusSchema = z.enum(songStatusValues);

export const updateSongStatus = async (id: string, status: SongStatusType) => {
  const userId = await getCurrentUserId();
  const nextStatus = statusSchema.parse(status);

  const existing = await prisma.song.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!existing) throw new Error("Música não encontrada");

  const song = await prisma.song.update({
    where: { id },
    data: { status: nextStatus },
  });

  const folderIds = await getSongFolderIds(id);

  revalidatePath("/");
  revalidatePath(`/musica/${song.id}`);
  updateTag(cacheTags.songs(userId));

  return toSongType(song, 0, folderIds);
};
