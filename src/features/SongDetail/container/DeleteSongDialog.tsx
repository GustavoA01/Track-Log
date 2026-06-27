"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDeleteSongMutation } from "../hooks/useDeleteSongMutation";

type DeleteSongDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  songId: string;
  songTitle: string;
};

export const DeleteSongDialog = ({
  open,
  onOpenChange,
  songId,
  songTitle,
}: DeleteSongDialogProps) => {
  const { mutateAsync, isPending } = useDeleteSongMutation();

  const handleConfirm = async () => {
    await mutateAsync(songId);
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Excluir música?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir &ldquo;{songTitle}&rdquo;? Esta ação
            não pode ser desfeita.
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
