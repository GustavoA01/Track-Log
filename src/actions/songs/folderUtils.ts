import { prisma } from "@/lib/prisma";

export const validateSongFolderIds = async (
  userId: string,
  folderIds: string[],
) => {
  if (folderIds.length === 0) return;

  const uniqueFolderIds = [...new Set(folderIds)];
  const folderCount = await prisma.folder.count({
    where: {
      userId,
      id: { in: uniqueFolderIds },
    },
  });

  if (folderCount !== uniqueFolderIds.length) {
    throw new Error("Pasta não encontrada");
  }
};

export const syncSongFolders = async (songId: string, folderIds: string[]) => {
  const uniqueFolderIds = [...new Set(folderIds)];

  await prisma.songFolder.deleteMany({
    where: { songId },
  });

  if (uniqueFolderIds.length === 0) return;

  await prisma.songFolder.createMany({
    data: uniqueFolderIds.map((folderId) => ({ songId, folderId })),
  });
};

export const getSongFolderIds = async (songId: string) => {
  const folders = await prisma.songFolder.findMany({
    where: { songId },
    select: { folderId: true },
    orderBy: { createdAt: "asc" },
  });

  return folders.map((folder) => folder.folderId);
};
