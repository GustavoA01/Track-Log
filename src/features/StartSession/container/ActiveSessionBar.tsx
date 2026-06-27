import { Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type ActiveSessionBarProps = {
  title: string;
  remainingTime: string;
  progress: number;
  className?: string;
};

export const ActiveSessionBar = ({
  title,
  remainingTime,
  progress,
  className,
}: ActiveSessionBarProps) => (
  <div
    role="status"
    aria-live="polite"
    className={cn(
      "fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2",
      className,
    )}
  >
    <div className="overflow-hidden rounded-2xl border bg-background/95 shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
        <span className="font-mono text-sm font-semibold tabular-nums sm:text-base">
          {remainingTime}
        </span>

        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
          {title}
        </span>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button variant="ghost" size="icon-sm" aria-label="Pausar sessão">
            <Pause />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Parar sessão"
            className="text-destructive hover:text-destructive"
          >
            <Square />
          </Button>
        </div>
      </div>

      <div className="h-0.5 w-full bg-muted">
        <div
          className="h-full bg-primary transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);
