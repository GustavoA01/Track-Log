import { Button } from "@/components/ui/button";
import { LoaderCircle, Pause } from "lucide-react";

type LearnStopButtonProps = {
  label: string;
  icon: typeof Pause;
  isPending: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const LearnStopButton = ({
  label = "Salvando...",
  icon: Icon,
  isPending,
  disabled,
  onClick,
}: LearnStopButtonProps) => (
  <Button
    type="button"
    variant="outline"
    disabled={disabled}
    onClick={onClick}
    className="rounded-full text-muted-foreground max-sm:w-full"
  >
    {isPending ? (
      <LoaderCircle className="size-3.5 animate-spin" />
    ) : (
      <Icon className="size-3.5" />
    )}
    <span>{label}</span>
  </Button>
);
