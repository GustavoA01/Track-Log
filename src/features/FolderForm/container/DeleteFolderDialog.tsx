import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

type DeleteFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderId: string;
  folderName: string;
  onDeleted: () => void;
};

export const DeleteFolderDialog = ({
  open,
  onOpenChange,
  folderId,
  folderName,
  onDeleted,
}: DeleteFolderDialogProps) => {
  const { handleConfirm, handleOpenChange, isPending } = useDeleteDialog(
    folderId,
    onDeleted,
    onOpenChange,
  );

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
