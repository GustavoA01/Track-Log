import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PracticeSessionType } from "@/data/types";
import { formatDateOnly } from "@/utils/dates";

type DeleteSessionDialogProps = {
  open: boolean;
  session: PracticeSessionType | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteSessionDialog = ({
  open,
  session,
  isPending,
  onOpenChange,
  onConfirm,
  onCancel,
}: DeleteSessionDialogProps) => {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Excluir sessão?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a sessão de{" "}
            {formatDateOnly(session.date)} ({session.minutes} min)? Esta ação
            não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
