import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn("animate-pulse rounded-lg bg-muted", className)}
    aria-hidden
  />
);
