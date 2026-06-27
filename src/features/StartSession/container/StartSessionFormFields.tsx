import { Timer } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import type { StartSessionValuesType } from "@/data/schemas/start-session";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";
import { DurationPresets } from "./DurationPresets";

export const StartSessionFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StartSessionValuesType>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormFieldLabel htmlFor="session-minutes" icon={Timer}>
          Duração (minutos)
        </FormFieldLabel>
        <Input
          id="session-minutes"
          type="number"
          min={1}
          max={180}
          inputMode="numeric"
          aria-invalid={!!errors.minutes}
          autoFocus
          {...register("minutes", { valueAsNumber: true })}
        />
        <FieldError message={errors.minutes?.message} />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Atalhos rápidos
        </p>
        <DurationPresets />
      </div>
    </div>
  );
};
