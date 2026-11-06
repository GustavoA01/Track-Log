import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FormFooterProps = {
  isSaving: boolean;
  submitLabel?: string;
  handleCancel: () => void;
};

const submitButtonClassName = "h-11 w-full sm:h-8 sm:w-auto rounded-full";

export const FormFooter = ({
  isSaving,
  submitLabel = "Salvar",
  handleCancel,
}: FormFooterProps) => (
  <CardFooter className="flex-col gap-2 sm:flex-row">
    <Button type="submit" disabled={isSaving} className={submitButtonClassName}>
      {isSaving ? "Salvando..." : submitLabel}
    </Button>
    <Button
      type="button"
      disabled={isSaving}
      variant="outline"
      className={submitButtonClassName}
      onClick={handleCancel}
    >
      Cancelar
    </Button>
  </CardFooter>
);
