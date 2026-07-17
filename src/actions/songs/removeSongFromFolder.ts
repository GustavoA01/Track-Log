"use server";
import { revalidatePath, updateTag } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { getSongFolderIds } from "@/actions/songs/folderUtils";
import { cacheTags } from "@/lib/cache-tags";

export const removeSongFromFolder = async (
  songId: string,
  folderId: string,
) => {
  const userId = await getCurrentUserId();

  const song = await prisma.song.findFirst({
    where: { id: songId, userId },
  });

  if (!song) throw new Error("Música não encontrada");

  await prisma.songFolder.deleteMany({
    where: { songId, folderId },
  });

  const folderIds = await getSongFolderIds(songId);

  revalidatePath("/");
  revalidatePath(`/musica/${songId}`);
  updateTag(cacheTags.songs(userId));

  return toSongType(song, 0, folderIds);
};
