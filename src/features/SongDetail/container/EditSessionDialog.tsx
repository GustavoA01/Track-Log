import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateOnly } from "@/utils/dates";
import { EditSessionFormFields } from "../components/EditSessionFormFields";
import { useEditSessionDialog } from "../hooks/useEditSessionDialog";

type EditSessionDialogProps = {
  dialog: ReturnType<typeof useEditSessionDialog>;
};

export const EditSessionDialog = ({ dialog }: EditSessionDialogProps) => {
  const {
    session,
    open,
    isPending,
    methods,
    dateUnlocked,
    handleOpenChange,
    closeDialog,
    toggleDateUnlocked,
    onSubmit,
  } = dialog;

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Editar sessão</DialogTitle>
          <DialogDescription>
            Sessão de {formatDateOnly(session.date)} · {session.minutes} min
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            id="edit-session-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <EditSessionFormFields
              dateUnlocked={dateUnlocked}
              onToggleDateUnlocked={toggleDateUnlocked}
            />
          </form>
        </FormProvider>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={closeDialog}
          >
            Cancelar
          </Button>
          <Button type="submit" form="edit-session-form" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
