import { useDeleteFolderMutation } from "./useDeleteFolderMutation";

export const useDeleteDialog = (
  folderId: string,
  onDeleted: () => void,
  onOpenChange: (open: boolean) => void,
) => {
  const { mutateAsync, isPending } = useDeleteFolderMutation();

  const handleConfirm = async () => {
    await mutateAsync(folderId);
    onDeleted?.();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) onOpenChange(nextOpen);
  };

  return { handleConfirm, handleOpenChange, isPending };
};
