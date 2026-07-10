import { useMemo, useState } from "react";
import type { SongFoldersSectionProps } from "../container/SongFoldersSection";
import {
  useAddSongToFolderMutation,
  useRemoveSongFromFolderMutation,
} from "./useSongFolderMutations";

export const useSongFoldersSection = ({
  songId,
  folders,
  songFolderIds,
  onFolderIdsChange,
}: SongFoldersSectionProps) => {
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [removingFolderId, setRemovingFolderId] = useState<string | null>(null);
  const { mutateAsync: addToFolder, isPending: isAdding } =
    useAddSongToFolderMutation(songId);
  const { mutateAsync: removeFromFolder, isPending: isRemoving } =
    useRemoveSongFromFolderMutation(songId);

  const songFolders = useMemo(
    () => folders.filter((folder) => songFolderIds.includes(folder.id)),
    [folders, songFolderIds],
  );

  const availableFolders = useMemo(
    () => folders.filter((folder) => !songFolderIds.includes(folder.id)),
    [folders, songFolderIds],
  );

  const handleAddFolder = async () => {
    if (!selectedFolderId) return;

    const updatedSong = await addToFolder(selectedFolderId);
    onFolderIdsChange(updatedSong.folderIds);
    setSelectedFolderId("");
  };

  const handleRemoveFolder = async (folderId: string) => {
    setRemovingFolderId(folderId);

    try {
      const updatedSong = await removeFromFolder(folderId);
      onFolderIdsChange(updatedSong.folderIds);
    } finally {
      setRemovingFolderId(null);
    }
  };

  const selectItems = Object.fromEntries(
    availableFolders.map((folder) => [folder.id, folder.name]),
  );

  const disableAddToFolder = !selectedFolderId || isAdding;

  return {
    songFolders,
    availableFolders,
    isRemoving,
    handleAddFolder,
    handleRemoveFolder,
    removingFolderId,
    setSelectedFolderId,
    selectedFolderId,
    selectItems,
    disableAddToFolder,
  };
};
