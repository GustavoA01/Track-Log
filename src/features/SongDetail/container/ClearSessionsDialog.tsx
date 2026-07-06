import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClearSessionsMutation } from "../hooks/useClearSessionsMutation";

type ClearSessionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  songId: string;
  sessionCount: number;
};

export const ClearSessionsDialog = ({
  open,
  onOpenChange,
  songId,
  sessionCount,
}: ClearSessionsDialogProps) => {
  const { mutateAsync, isPending } = useClearSessionsMutation(songId);

  const handleConfirm = async () => {
    await mutateAsync();
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
          <DialogTitle>Limpar sessões?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir todas as {sessionCount}{" "}
            {sessionCount === 1 ? "sessão" : "sessões"} desta música? Esta ação
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
            {isPending ? "Limpando..." : "Limpar sessões"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
