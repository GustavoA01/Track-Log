import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type FolderFormFooterProps = {
  formId?: string;
  isSaving: boolean;
  submitLabel?: string;
  onCancel: () => void;
};

export const FolderFormFooter = ({
  formId = "new-folder-form",
  isSaving,
  submitLabel = "Criar pasta",
  onCancel,
}: FolderFormFooterProps) => (
  <DialogFooter>
    <Button variant="ghost" disabled={isSaving} onClick={onCancel}>
      Cancelar
    </Button>
    <Button type="submit" form={formId} disabled={isSaving}>
      {isSaving ? "Salvando..." : submitLabel}
    </Button>
  </DialogFooter>
);
