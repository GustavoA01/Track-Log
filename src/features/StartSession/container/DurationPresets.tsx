import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { StartSessionValuesType } from "@/data/schemas/start-session";

export const DurationPresets = () => {
  const { setValue, watch } = useFormContext<StartSessionValuesType>();
  const selectedMinutes = Number(watch("minutes"));
  const sessionDurationPresets = [5, 10, 15, 30, 60];

  return (
    <div className="flex flex-wrap gap-2">
      {sessionDurationPresets.map((minutes) => (
        <Button
          key={minutes}
          type="button"
          variant={selectedMinutes === minutes ? "default" : "outline"}
          size="sm"
          onClick={() => setValue("minutes", minutes, { shouldValidate: true })}
        >
          {minutes} min
        </Button>
      ))}
    </div>
  );
};
