import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SongStatusType } from "@/data/types";
import { useUpdateSongStatusMutation } from "../hooks/useUpdateSongStatusMutation";

type MarkAsLearnedButtonProps = {
  songId: string;
  status: SongStatusType;
  onStatusChange: (status: SongStatusType) => void;
};

export const MarkAsLearnedButton = ({
  songId,
  status,
  onStatusChange,
}: MarkAsLearnedButtonProps) => {
  const { handleMarkAsLearned, isPending, showSuccess, shouldRender } =
    useUpdateSongStatusMutation({
      songId,
      status,
      onStatusChange,
    });

  if (!shouldRender) return null;

  if (showSuccess) {
    return (
      <div className="flex items-center gap-2 select-none">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-full",
            "bg-green-500/15 ring-2 ring-green-500/30",
            "animate-in zoom-in-50 fade-in duration-300",
          )}
        >
          <Check
            strokeWidth={3}
            className="size-5 text-green-600 animate-in zoom-in fade-in duration-500 dark:text-green-400"
          />
        </div>
        <span className="text-sm font-medium text-green-700 animate-in fade-in slide-in-from-left-1 duration-300 dark:text-green-400">
          Aprendida!
        </span>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={handleMarkAsLearned}
      className="gap-1.5 rounded-full"
    >
      {isPending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Check className="size-4" />
      )}
      <span>{isPending ? "Salvando..." : "Marcar como aprendida"}</span>
    </Button>
  );
};
