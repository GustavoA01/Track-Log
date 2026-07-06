import { NotebookPen } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Textarea } from "@/components/ui/textarea";
import type { EndSessionValuesType } from "@/data/schemas/end-session";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";

export const EndSessionFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EndSessionValuesType>();

  return (
    <div className="space-y-2">
      <FormFieldLabel htmlFor="session-notes" icon={NotebookPen}>
        O que você praticou?
      </FormFieldLabel>
      <Textarea
        id="session-notes"
        placeholder="Ex.: Trabalhei a transição do verso pro refrão"
        rows={4}
        aria-invalid={!!errors.notes}
        autoFocus
        {...register("notes")}
      />
      <FieldError message={errors.notes?.message} />
    </div>
  );
};
