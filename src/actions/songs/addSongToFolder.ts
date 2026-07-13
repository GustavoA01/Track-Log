"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth";
import { toSongType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";
import { getSongFolderIds } from "@/actions/songs/folder-utils";

export const addSongToFolder = async (songId: string, folderId: string) => {
  const userId = await getCurrentUserId();

  const [song, folder] = await Promise.all([
    prisma.song.findFirst({
      where: { id: songId, userId },
    }),
    prisma.folder.findFirst({
      where: { id: folderId, userId },
    }),
  ]);

  if (!song) throw new Error("Música não encontrada");
  if (!folder) throw new Error("Pasta não encontrada");

  await prisma.songFolder.upsert({
    where: {
      songId_folderId: { songId, folderId },
    },
    create: { songId, folderId },
    update: {},
  });

  const folderIds = await getSongFolderIds(songId);

  revalidatePath("/");
  revalidatePath(`/musica/${songId}`);

  return toSongType(song, 0, folderIds);
};
