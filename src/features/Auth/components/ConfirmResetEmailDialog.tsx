import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmResetEmailDialogProps = {
  open: boolean;
  email: string;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmResetEmailDialog = ({
  open,
  email,
  isPending,
  onOpenChange,
  onConfirm,
}: ConfirmResetEmailDialogProps) => {
  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Enviar e-mail de redefinição?</DialogTitle>
          <DialogDescription>
            Vamos enviar um link para{" "}
            <span className="font-medium text-foreground">{email}</span>. Abra o
            e-mail e siga as instruções para criar uma nova senha.
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
          <Button type="button" disabled={isPending} onClick={onConfirm}>
            {isPending ? "Enviando..." : "Enviar e-mail"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
