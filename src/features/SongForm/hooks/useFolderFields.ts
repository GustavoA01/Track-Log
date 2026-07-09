import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useState } from "react";
import { useMemo } from "react";
import { FolderType } from "@/data/types";
import { SongFormValuesType } from "@/data/schemas/song-form";

export const useFolderFields = (
  folders: Pick<FolderType, "id" | "name" | "color">[],
) => {
  const emptyFolderIds: string[] = [];
  const { control, setValue } = useFormContext<SongFormValuesType>();
  const folderIds = useWatch({ control, name: "folderIds" }) ?? emptyFolderIds;
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const availableFolders = useMemo(
    () => folders.filter((folder) => !folderIds.includes(folder.id)),
    [folderIds, folders],
  );

  const selectedFolders = useMemo(
    () => folders.filter((folder) => folderIds.includes(folder.id)),
    [folderIds, folders],
  );

  const handleAddFolder = () => {
    const notValidAddiction =
      !selectedFolderId || folderIds.includes(selectedFolderId);
    if (notValidAddiction) return;

    setValue("folderIds", [...folderIds, selectedFolderId], {
      shouldDirty: true,
    });
    setSelectedFolderId("");
  };

  const handleRemoveFolder = (folderId: string) => {
    setValue(
      "folderIds",
      folderIds.filter((id) => id !== folderId),
      { shouldDirty: true },
    );
  };

  return {
    availableFolders,
    selectedFolders,
    handleAddFolder,
    handleRemoveFolder,
    selectedFolderId,
    setSelectedFolderId,
  };
};
