import { Calendar, Clock, Lock, LockOpen, NotebookPen } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EditSessionValuesType } from "@/data/schemas/edit-session";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";

type EditSessionFormFieldsProps = {
  dateUnlocked: boolean;
  onToggleDateUnlocked: () => void;
};

export const EditSessionFormFields = ({
  dateUnlocked,
  onToggleDateUnlocked,
}: EditSessionFormFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditSessionValuesType>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormFieldLabel htmlFor="session-date" icon={Calendar}>
          Data
        </FormFieldLabel>
        <div className="flex gap-2">
          <Input
            id="session-date"
            type="date"
            disabled={!dateUnlocked}
            aria-invalid={!!errors.date}
            className="flex-1"
            {...register("date")}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={dateUnlocked ? "Bloquear data" : "Desbloquear data"}
            aria-pressed={dateUnlocked}
            onClick={onToggleDateUnlocked}
          >
            {dateUnlocked ? (
              <LockOpen className="size-4" />
            ) : (
              <Lock className="size-4" />
            )}
          </Button>
        </div>
        <FieldError message={errors.date?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="session-minutes" icon={Clock}>
          Duração (min)
        </FormFieldLabel>
        <Input
          id="session-minutes"
          type="number"
          min={1}
          max={180}
          inputMode="numeric"
          aria-invalid={!!errors.minutes}
          {...register("minutes", { valueAsNumber: true })}
        />
        <FieldError message={errors.minutes?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="session-notes" icon={NotebookPen}>
          Anotações
        </FormFieldLabel>
        <Textarea
          id="session-notes"
          placeholder="O que você praticou nesta sessão?"
          rows={4}
          aria-invalid={!!errors.notes}
          {...register("notes")}
        />
        <FieldError message={errors.notes?.message} />
      </div>
    </div>
  );
};
