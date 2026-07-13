"use server";

import { getCurrentUserId } from "@/lib/auth";
import { toFolderType } from "@/utils/mappers";
import { prisma } from "@/lib/prisma";

export const getFolderById = async (id: string) => {
  const userId = await getCurrentUserId();

  const folder = await prisma.folder.findFirst({
    where: { id, userId },
  });

  return folder ? toFolderType(folder) : null;
};
