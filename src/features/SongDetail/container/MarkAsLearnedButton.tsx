import { BookOpen, Check, LoaderCircle, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SongStatusType } from "@/data/types";
import { useUpdateSongStatusMutation } from "../hooks/useUpdateSongStatusMutation";
import { LearnStopButton } from "../components/LearnStopButton";

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
  const {
    handleMarkAsLearned,
    handleUpdateStatus,
    isPending,
    pendingStatus,
    showSuccess,
    shouldRender,
  } = useUpdateSongStatusMutation({
    songId,
    status,
    onStatusChange,
  });

  const showPause = status !== "paused" && !showSuccess;
  const showLearning = status !== "learning" && !showSuccess;
  const hasActions = shouldRender || showPause || showLearning;

  if (!hasActions) return null;

  return (
    <>
      {shouldRender &&
        (showSuccess ? (
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
        ) : (
          <Button
            size="lg"
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleMarkAsLearned}
            className="w-full gap-1.5 rounded-full sm:w-auto"
          >
            {pendingStatus === "learned" ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            <span>
              {pendingStatus === "learned"
                ? "Salvando..."
                : "Marcar como aprendida"}
            </span>
          </Button>
        ))}

      {showPause && (
        <LearnStopButton
          label="Pausar"
          icon={Pause}
          isPending={pendingStatus === "paused"}
          disabled={isPending}
          onClick={() => handleUpdateStatus("paused")}
        />
      )}

      {showLearning && (
        <LearnStopButton
          label="Aprendendo"
          icon={BookOpen}
          isPending={pendingStatus === "learning"}
          disabled={isPending}
          onClick={() => handleUpdateStatus("learning")}
        />
      )}
    </>
  );
};
