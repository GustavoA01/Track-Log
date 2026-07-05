import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteFolderMutation } from "@/features/FolderForm/hooks/useDeleteFolderMutation";

type DeleteFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderId: string;
  folderName: string;
  onDeleted?: () => void;
};

export const DeleteFolderDialog = ({
  open,
  onOpenChange,
  folderId,
  folderName,
  onDeleted,
}: DeleteFolderDialogProps) => {
  const { mutateAsync, isPending } = useDeleteFolderMutation();

  const handleConfirm = async () => {
    await mutateAsync(folderId);
    onDeleted?.();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) {
      onOpenChange(nextOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Excluir pasta?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir &ldquo;{folderName}&rdquo;? As
            músicas desta pasta não serão excluídas.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
