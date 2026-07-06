import { useState } from "react";

type UseFolderProps = {
  folderId: string;
  isSelected: boolean;
  setSelectedFolderId: (id: string | null) => void;
};

export const useFolder = ({
  folderId,
  isSelected,
  setSelectedFolderId,
}: UseFolderProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDeleted = () => {
    if (isSelected) setSelectedFolderId(null);
  };
  const openDeleteDialog = () => setDeleteOpen(true);
  const openEditDialog = () => setEditOpen(true);

  const toggleSelection = () =>
    setSelectedFolderId(isSelected ? null : folderId);

  return {
    deleteOpen,
    setDeleteOpen,
    editOpen,
    setEditOpen,
    handleDeleted,
    openDeleteDialog,
    openEditDialog,
    toggleSelection,
  };
};
