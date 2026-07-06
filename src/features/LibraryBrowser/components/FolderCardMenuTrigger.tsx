import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FolderCardMenuTriggerProps = {
  className?: string;
  onClick?: () => void;
};

export const FolderCardMenuTrigger = ({
  className,
  onClick,
}: FolderCardMenuTriggerProps) => (
  <Button
    variant="ghost"
    size="icon-sm"
    className={cn("size-7 shrink-0", className)}
    aria-label="Opções da pasta"
    onClick={(event) => {
      event.stopPropagation();
      onClick?.();
    }}
  >
    <EllipsisVertical className="size-4" />
  </Button>
);
