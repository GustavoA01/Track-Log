import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FormFooterProps = {
  isSaving: boolean;
  submitLabel?: string;
  handleCancel: () => void;
};

export const FormFooter = ({
  isSaving,
  submitLabel = "Salvar",
  handleCancel,
}: FormFooterProps) => (
  <CardFooter className="gap-2">
    <Button type="submit" disabled={isSaving}>
      {isSaving ? "Salvando..." : submitLabel}
    </Button>
    <Button
      type="button"
      disabled={isSaving}
      variant="ghost"
      onClick={handleCancel}
    >
      Cancelar
    </Button>
  </CardFooter>
);
