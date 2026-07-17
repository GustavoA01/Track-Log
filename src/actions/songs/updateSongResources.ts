"use server";
import { revalidatePath, updateTag } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { getSongFolderIds } from "@/actions/songs/folderUtils";
import { UpdateSongResourcesInput } from "../../data/types/actions";
import { cacheTags } from "@/lib/cache-tags";

export const updateSongResources = async (
  id: string,
  data: UpdateSongResourcesInput,
) => {
  const userId = await getCurrentUserId();

  const existing = await prisma.song.findFirst({
    where: { id, userId },
  });

  if (!existing) throw new Error("Música não encontrada");

  const song = await prisma.song.update({
    where: { id },
    data: {
      ...(data.videoUrl !== undefined ? { videoUrl: data.videoUrl } : {}),
      ...(data.tabUrl !== undefined ? { tabUrl: data.tabUrl } : {}),
    },
  });

  revalidatePath(`/musica/${song.id}`);
  updateTag(cacheTags.songs(userId));

  const folderIds = await getSongFolderIds(song.id);

  return toSongType(song, 0, folderIds);
};
