import { Control, Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { songStatusConfig } from "@/data/constants";
import {
  type SongFormValuesType,
  songStatusValues,
} from "@/data/schemas/song-form";
import { cn } from "@/lib/utils";

const songStatusItems = Object.fromEntries(
  songStatusValues.map((status) => [status, songStatusConfig[status].label]),
) as Record<(typeof songStatusValues)[number], string>;

export const StatusSelect = ({
  control,
}: {
  control: Control<SongFormValuesType>;
}) => (
  <Controller
    name="status"
    control={control}
    defaultValue="want_to_learn"
    render={({ field }) => {
      const selectedConfig = songStatusConfig[field.value];

      return (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          items={songStatusItems}
        >
          <SelectTrigger
            id="status"
            className={cn("w-full", selectedConfig.selectTriggerClassName)}
          >
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            {songStatusValues.map((status) => (
              <SelectItem
                key={status}
                value={status}
                label={songStatusConfig[status].label}
              >
                {songStatusConfig[status].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }}
  />
);
