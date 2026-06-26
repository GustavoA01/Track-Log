import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type FolderFormFooterProps = {
  isSaving: boolean;
  onCancel: () => void;
};

export const FolderFormFooter = ({
  isSaving,
  onCancel,
}: FolderFormFooterProps) => (
  <DialogFooter>
    <Button
      type="button"
      variant="ghost"
      disabled={isSaving}
      onClick={onCancel}
    >
      Cancelar
    </Button>
    <Button type="submit" form="new-folder-form" disabled={isSaving}>
      {isSaving ? "Salvando..." : "Criar pasta"}
    </Button>
  </DialogFooter>
);
