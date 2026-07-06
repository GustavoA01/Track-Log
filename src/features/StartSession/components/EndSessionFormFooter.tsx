import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type EndSessionFormFooterProps = {
  isSubmitting: boolean;
  onDiscard: () => void;
};

export const EndSessionFormFooter = ({
  isSubmitting,
  onDiscard,
}: EndSessionFormFooterProps) => (
  <DialogFooter>
    <Button
      type="button"
      variant="ghost"
      disabled={isSubmitting}
      onClick={onDiscard}
    >
      Descartar
    </Button>
    <Button type="submit" form="end-session-form" disabled={isSubmitting}>
      {isSubmitting ? "Salvando..." : "Salvar sessão"}
    </Button>
  </DialogFooter>
);
