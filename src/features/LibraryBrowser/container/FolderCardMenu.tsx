"use client";

import { FolderCardMenuDropdown } from "../components/FolderCardMenuDropdown";
import { FolderCardMenuSheet } from "../components/FolderCardMenuSheet";
import { FolderCardMenuTrigger } from "../components/FolderCardMenuTrigger";
import { useFolderCardMenu } from "../hooks/useFolderCardMenu";

type FolderCardMenuProps = {
  folderName: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const FolderCardMenu = ({
  folderName,
  onDelete,
  onEdit,
}: FolderCardMenuProps) => {
  const {
    sheetOpen,
    setSheetOpen,
    openSheet,
    handleSheetEdit,
    handleSheetDelete,
  } = useFolderCardMenu({ onEdit, onDelete });

  return (
    <>
      <FolderCardMenuTrigger className="sm:hidden" onClick={openSheet} />
      <FolderCardMenuDropdown onEdit={onEdit} onDelete={onDelete} />
      <FolderCardMenuSheet
        folderName={folderName}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onEdit={handleSheetEdit}
        onDelete={handleSheetDelete}
      />
    </>
  );
};
