import { songStatusConfig } from "@/data/constants";
import type { SongStatusType } from "@/data/types";
import { cn } from "@/lib/utils";

type SongStatusBadgeProps = {
  status: SongStatusType;
  className?: string;
};

export const SongStatusBadge = ({
  status,
  className,
}: SongStatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
      songStatusConfig[status].badgeClassName,
      className,
    )}
  >
    {songStatusConfig[status].label}
  </span>
);
