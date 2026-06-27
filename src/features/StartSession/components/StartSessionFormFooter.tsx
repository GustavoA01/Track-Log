import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type StartSessionFormFooterProps = {
  isSubmitting: boolean;
  onCancel: () => void;
};

export const StartSessionFormFooter = ({
  isSubmitting,
  onCancel,
}: StartSessionFormFooterProps) => (
  <DialogFooter>
    <Button
      type="button"
      variant="ghost"
      disabled={isSubmitting}
      onClick={onCancel}
    >
      Cancelar
    </Button>
    <Button type="submit" form="start-session-form" disabled={isSubmitting}>
      {isSubmitting ? "Iniciando..." : "Iniciar cronômetro"}
    </Button>
  </DialogFooter>
);
