import { useState } from "react";

type UseFolderCardMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const useFolderCardMenu = ({
  onEdit,
  onDelete,
}: UseFolderCardMenuProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const openSheet = () => setSheetOpen(true);

  const handleSheetEdit = () => {
    setSheetOpen(false);
    onEdit();
  };

  const handleSheetDelete = () => {
    setSheetOpen(false);
    onDelete();
  };

  return {
    sheetOpen,
    setSheetOpen,
    openSheet,
    handleSheetEdit,
    handleSheetDelete,
  };
};
